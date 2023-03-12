const express = require('express')

const { restoreUser, requireAuth } = require('../../utils/auth');
const { Group, User, Venue, groupsImage, Event, Membership } = require('../../db/models');

const router = express.Router();

router.use(restoreUser);

const formatDate = (date) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  let dateStr = "";
  let month = "";

  const dateArr = date.toString().split(' ');

  month += (months.indexOf(dateArr[1]) + 1);
  if (month.length === 1) month = ('0' + month);

  dateStr += (dateArr[3] + '-' + month + '-' + dateArr[2] + ' ' + dateArr[4]);

  return dateStr;
};

//GET all groups
router.get('/', async (req, res) => {
  const Groups = await Group.findAll();

  for await (let group of Groups) {
    const img = await groupsImage.findOne({
      where: { groupId: group.id }
    });

    if (img) {
      group.dataValues.previewImage = img.url
    } else {
      group.dataValues.previewImage = 'no img url'
    }
    const members = await Membership.findAll({
      where: { groupId: group.id }
    });

    if (members.length) {
      let sum = 0;
      members.forEach(member => {
        sum++;
      });
      group.dataValues.numMembers = sum;
    } else {
      group.dataValues.numMembers = 0;
    }
  };

  return res.json({ Groups });
});

//POST new group
router.post('/', requireAuth, async (req, res) => {
  const { name, about, type, private, city, state, previewImage } = req.body;

  const newGroup = await Group.create({
    organizerId: req.user.id, name, about, type, private, city, state, previewImage
  });

  return res.redirect(`/api/groups/${newGroup.id}`)
  // return res.status(201).json({
  //   id: newGroup.id,
  //   organizerId: newGroup.organizerId,
  //   name: newGroup.name,
  //   about: newGroup.about,
  //   type: newGroup.type,
  //   private: newGroup.private,
  //   city: newGroup.city,
  //   state: newGroup.state,
  //   previewImage: newGroup.previewImage,
  //   createdAt: newGroup.createdAt,
  //   updatedAt: newGroup.updatedAt
  // });
});

//GET all groups by Current User
router.get('/current', requireAuth, async (req, res) => {
  const { user } = req;
  const Groups = await Group.findAll({
    where: { organizerId: user.id }
  });

  for await (let group of Groups) {
    const img = await groupsImage.findOne({
      where: { groupId: group.id }
    });

    if (img) {
      group.dataValues.previewImage = img.url
    } else {
      group.dataValues.previewImage = 'no img url'
    }
    const members = await Membership.findAll({
      where: { groupId: group.id }
    });

    if (members.length) {
      let sum = 0;
      members.forEach(member => {
        sum++;
      });
      group.dataValues.numMembers = sum;
    } else {
      group.dataValues.numMembers = 0;
    }
  };

  return res.json({ Groups });
});

//GET details of group from id
router.get('/:groupId', async (req, res) => {
  const groupId = req.params.groupId;
  const group = await Group.findOne({
    where: { id: groupId },
    // attributes: {
    //   exclude: ['previewImage']
    // },
    include: [
      {
        model: groupsImage,
        attributes: ['id', 'url', 'preview'],
        as: 'GroupImages'
      },
      {
        model: User,
        attributes: ['id', 'firstName', 'lastName'],
        as: 'Organizer'
      },
      {
        model: Venue,
        attributes: ['id', 'groupId', 'address', 'city', 'state', 'lat', 'lng']
      }
    ]
  });

  if (!group) {
    const errObj = {
      message: "Group couldn't be found",
      statusCode: 404
    }

    return res.status(404).json(errObj);
  }

  res.json(group);
});

//PUT updates and returns existing group
router.put('/:groupId', requireAuth, async (req, res) => {
  const { user } = req;
  const { name, about, type, private, city, state } = req.body;
  const groupId = Number(req.params.groupId);
  const group = await Group.findByPk(groupId);

  if (group) {
    const organizerId = group.organizerId;
    if (user.id === organizerId) {
      group.name = name;
      group.about = about;
      group.type = type;
      group.private = private;
      group.city = city;
      group.state = state;

      await group.save();

      return res.json(group);
    } else {
      return res.status(403).json({
        message: "User not authorized to update group",
        statusCode: 403
      });
    }
  } else {
    return res.status(404).json({
      message: "Group couldn't be found",
      statusCode: 404
    });
  }
});

//POST image to group based on group id
router.post('/:groupId/images', requireAuth, async (req, res) => {
  const { user } = req;
  const { url, preview } = req.body;
  const groupId = Number(req.params.groupId);
  const group = await Group.findByPk(groupId);

  if (group) {
    const organizerId = group.organizerId;
    if (user.id === organizerId) {
      const newImage = await groupsImage.create({
        groupId, url, preview
      });

      return res.json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
      });
    } else {
      return res.status(403).json({
        message: "User not authorized to add image",
        statusCode: 403
      });
    }
  } else {
    return res.status(404).json({
      message: "Group couldn't be found",
      statusCode: 404
    });
  }
});

//GET venue based on group ID
router.get('/:groupId/venues', requireAuth, async (req, res) => {
  const { user } = req;
  const groupId = Number(req.params.groupId);
  const group = await Group.findByPk(groupId);

  if (group) {
    const organizerId = group.organizerId;
    if (user.id === organizerId) {
      const venue = await Venue.findByPk(groupId, {
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });

      res.json({ Venues: [venue] });

    } else {
      return res.status(403).json({
        message: "User not authorized to add image",
        statusCode: 403
      });
    }
  } else {
    return res.status(404).json({
      message: "Group couldn't be found",
      statusCode: 404
    });
  }
});

//POST new venue based on group ID
router.post('/:groupId/venues', requireAuth, async (req, res) => {
  const { user } = req;
  const { address, city, state, lat, lng } = req.body;
  const groupId = Number(req.params.groupId);
  const group = await Group.findByPk(groupId);

  if (group) {
    const organizerId = group.organizerId;
    if (user.id === organizerId) {
      const newVenue = await Venue.create({
        groupId: groupId, address, city, state, lat, lng
      });

      return res.json({
        id: newVenue.id,
        groupId: groupId,
        address: newVenue.address,
        city: newVenue.city,
        state: newVenue.state,
        lat: newVenue.lat,
        lng: newVenue.lng
      });
    } else {
      return res.status(403).json({
        message: "User not authorized to add venue",
        statusCode: 403
      });
    }
  } else {
    return res.status(404).json({
      message: "Group couldn't be found",
      statusCode: 404
    });
  }
});

//GET all events of a group
router.get('/:groupId/events', async (req, res) => {
  const groupId = Number(req.params.groupId);
  const events = await Event.findAll({
    where: { groupId: groupId },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'capacity', 'price']
    },
    include: [
      {
        model: Group,
        attributes: ['id', 'name', 'city', 'state']
      },
      {
        model: Venue,
        attributes: ['id', 'city', 'state']
      }
    ]
  });

  const group = await Group.findByPk(groupId);

  if (group) {
    return res.json({ Events: events });
  } else {
    return res.status(404).json({
      message: "Group couldn't be found",
      statusCode: 404
    });
  }
});

//POST event by group ID
router.post('/:groupId/events', requireAuth, async (req, res) => {
  const { user } = req;
  const { venueId, name, type, capacity, price, description, startDate, endDate, previewImage } = req.body;
  const groupId = Number(req.params.groupId);
  const group = await Group.findByPk(groupId);

  if (group) {
    const organizerId = group.organizerId;
    if (user.id === organizerId) {
      const newEvent = await Event.create({
        groupId: groupId, venueId, name, type, capacity, price, description, startDate, endDate, previewImage
      });

      return res.json({
        id: newEvent.id,
        groupId: groupId,
        venueId: newEvent.venueId,
        name: newEvent.name,
        type: newEvent.type,
        capacity: newEvent.capacity,
        price: newEvent.price,
        description: newEvent.description,
        previewImage: newEvent.previewImage,
        startDate: formatDate(newEvent.startDate),
        endDate: formatDate(newEvent.endDate)
      });
    } else {
      return res.status(403).json({
        message: "User not authorized to create event",
        statusCode: 403
      });
    }
  } else {
    return res.status(404).json({
      message: "Group couldn't be found",
      statusCode: 404
    });
  }
});

//GET all members of a group
router.get('/:groupId/members', async (req, res) => {
  const { user } = req;
  const groupId = Number(req.params.groupId);
  const group = await Group.findByPk(groupId);
  const members = await User.findAll({
    attributes: {
      exclude: ['username']
    },
    include: [
      {
        model: Membership,
        attributes: ['status'],
        as: 'Membership'
      }
    ]
  });

  if (group) {
    const organizerId = group.organizerId;

    if (user.id !== organizerId) {
      const pendingMembers = await User.findAll({
        attributes: {
          exclude: ['username']
        },
        include: [
          {
            model: Membership,
            where: { status: ['co-host', 'member'] },
            attributes: ['status'],
            as: 'Membership'
          }
        ]
      });

      return res.json({ Members: pendingMembers })
    } else {
      return res.json({ Members: members })
    }
  } else {
    return res.status(404).json({
      message: "Group couldn't be found",
      statusCode: 404
    });
  }
});

//POST request membership for group based on group ID
router.post('/:groupId/membership', requireAuth, async (req, res) => {
  const { user } = req;
  const groupId = Number(req.params.groupId);
  const group = await Group.findByPk(groupId);

  if (group) {
    const member = await Membership.findOne({
      where: { userId: user.id }
    });

    if (!member) {
      const newMember = await Membership.create({
        userId: user.id, groupId: groupId, status: 'pending'
      });

      return res.json({
        memberId: newMember.userId,
        status: newMember.status
      });
    }

    if (member.status === 'pending') {
      return res.status(400).json({
        message: "Membership has already been requested",
        statusCode: 400
      });
    } else {
      return res.status(400).json({
        message: "User is already a member of the group",
        statusCode: 400
      });
    }
  } else {
    return res.status(404).json({
      message: "Group couldn't be found",
      statusCode: 404
    });
  }
});

//PUT change status of membership by group ID
router.put('/:groupId/membership', requireAuth, async (req, res) => {
  const { user } = req;
  const { status } = req.body;
  const groupId = Number(req.params.groupId);
  const group = await Group.findByPk(groupId);

  if (group) {
    const member = await Membership.findOne({
      where: { groupId: groupId }
    });
    const organizerId = group.organizerId;

    if (user.id === organizerId || member.status === 'co-host') {
      member.status = status

      await member.save();

      return res.json({
        id: user.id,
        groupId: groupId,
        memberId: member.userId,
        status: member.status
      });
    }
  } else {
    return res.status(404).json({
      message: "Group couldn't be found",
      statusCode: 404
    });
  }
});

//DELETE existing group
router.delete('/:groupId', requireAuth, async (req, res) => {
  const groupId = Number(req.params.groupId);
  const group = await Group.findByPk(groupId);

  if (group) {
    // await Group.destroy({
    //   where: { id: groupId }
    // });
    const groupDel = await Group.findOne({
      where: {
        id: groupId
      }
    });
    console.log(groupDel)
    await groupDel.destroy();

    return res.json(group);
  } else {
    return res.status(404).json({
      message: "Group couldn't be found",
      statusCode: 404
    });
  }
});

//DELETE membership based on group Id
router.delete('/:groupId/membership', requireAuth, async (req, res) => {
  const { user } = req;
  const groupId = Number(req.params.groupId);
  const membership = await Membership.findByPk(groupId);
  const group = await Group.findByPk(groupId);

  if (!group) {
    return res.status(404).json({
      message: "Group couldn't be found",
      statusCode: 404
    });
  }

  if (membership) {
    Membership.destroy({
      where: { groupId: groupId }
    })

    return res.json({
      message: "Successfully deleted membership from group"
    });
  } else {
    return res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: { memberId: "User couldn't be found" }
    });
  }
});

module.exports = router;
