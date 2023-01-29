const express = require('express')

const { restoreUser, requireAuth } = require('../../utils/auth');
const { Group, User, Venue, Event, eventsImage } = require('../../db/models');

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

//GET all events
router.get('/', async (req, res) => {
  const events = await Event.findAll({
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

  return res.json({ Events: events });
});

//GET details of event by ID
router.get('/:eventId', async (req, res) => {
  const eventId = Number(req.params.eventId);
  const event = await Event.findOne({
    where: {
      id: eventId
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'previewImage']
    },
    include: [
      {
        model: Group,
        attributes: ['id', 'name', 'private', 'city', 'state']
      },
      {
        model: Venue,
        attributes: ['id', 'address', 'city', 'state', 'lat', 'lng']
      },
      {
        model: eventsImage,
        attributes: ['id', 'url', 'preview'],
        as: 'EventImages'
      }
    ]
  });

  if (event) {
    return res.json(event);
  } else {
    return res.status(404).json({
      message: "Event couldn't be found",
      statusCode: 404
    });
  }
});

//PUT event by ID
router.put('/:eventId', requireAuth, async (req, res) => {
  const { user } = req;
  const { venueId, name, type, capacity, price, description, startDate, endDate } = req.body;
  const eventId = Number(req.params.eventId);
  const event = await Event.findByPk(eventId, {
    attributes: {
      exclude: ['createdAt', 'updatedAt','numAttending', 'previewImage']
    }
  });

  if (event) {
    const groupId = event.groupId;
    const group = await Group.findByPk(groupId);
    const organizerId = group.organizerId;

    if (user.id === organizerId) {
      event.venueId = venueId,
      event.name = name,
      event.type = type,
      event.capacity = capacity,
      event.price = price;
      event.description = description,
      event.startDate = startDate,
      event.endDate = endDate

      await event.save();

      return res.json({
        id: event.id,
        groupId: event.groupId,
        venueId: event.venueId,
        name: event.name,
        type: event.type,
        capacity: event.capacity,
        price: event.price,
        description: event.description,
        startDate: formatDate(event.startDate),
        endDate: formatDate(event.endDate)
      });
    } else {
      return res.status(403).json({
        message: "User not authorized to update event",
        statusCode: 403
      });
    }
  } else {
    return res.status(404).json({
      message: "Event couldn't be found",
      statusCode: 404
    });
  }
});

//POST image to event based on event ID
router.post('/:eventId/images', requireAuth, async (req, res) => {

});

module.exports = router;
