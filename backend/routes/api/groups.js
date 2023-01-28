const express = require('express')

const { restoreUser, requireAuth } = require('../../utils/auth');
const { Group, User, Venue, groupsImage } = require('../../db/models');

const router = express.Router();

router.use(restoreUser);


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

module.exports = router;
