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

  return res.json({ Groups });
});

//POST new group
router.post('/', requireAuth, async (req, res) => {
  const { name, about, type, private, city, state } = req.body;

  const newGroup = await Group.create({
    organizerId: req.user.id, name, about, type, private, city, state
  });

  return res.status(201).json(newGroup);
});

//GET all groups by Current User
router.get('/current', requireAuth, async (req, res) => {
  const { user } = req;
  const Groups = await Group.findAll({
    where: { organizerId: user.id }
  });

  return res.json({ Groups });
});

//GET Group from id
router.get('/:groupId', async (req, res) => {
  const groupId = req.params.groupId;
  const group = await Group.findOne({
    where: { id: groupId },
    attributes: {
      exclude: ['previewImage']
    },
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
      exclude: ['createdAt', 'updatedAt', 'description', 'capacity', 'price']
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
  const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;
  const groupId = Number(req.params.groupId);
  const group = await Group.findByPk(groupId);

  if (group) {
    const organizerId = group.organizerId;
    if (user.id === organizerId) {
      const newEvent = await Event.create({
        groupId: groupId, venueId, name, type, capacity, price, description, startDate, endDate
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

//POST request membership for group based on group ID
router.post('/:groupId/membership', requireAuth, async (req, res) => {
  const { user } = req;
  const groupId = Number(req.params.groupId);
  const group = await Group.findByPk(groupId);

  if (group) {
    const member = await Membership.findOne({
      where: { userId: user.id}
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

module.exports = router;
