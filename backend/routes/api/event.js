const express = require('express')

const { restoreUser, requireAuth } = require('../../utils/auth');
const { Group, User, Venue, Event, eventsImage, Membership, Attendee } = require('../../db/models');

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
      exclude: ['createdAt', 'updatedAt']
    },
    include: [
      {
        model: Group,
        // attributes: ['id', 'name', 'private', 'city', 'state']
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

  const user = await User.findByPk(event.Group.organizerId);
  event.setDataValue(`Organizer`, user);

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
      exclude: ['createdAt', 'updatedAt', 'numAttending', 'previewImage']
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
  const { user } = req;
  const { url, preview } = req.body;
  const eventId = Number(req.params.eventId);
  const event = await Event.findByPk(eventId);

  if (event) {
    const newEventImg = await eventsImage.create({
      eventId: eventId, url, preview
    });

    return res.json({
      id: eventId,
      url: newEventImg.url,
      preview: newEventImg.preview
    });
  } else {
    return res.status(404).json({
      message: "Event couldn't be found",
      statusCode: 404
    });
  }
});

//GET all attendees of an event by ID
router.get('/:eventId/attendees', async (req, res) => {
  const { user } = req;
  const eventId = Number(req.params.eventId);
  const event = await Event.findByPk(eventId);
  const attendees = await User.findAll({
    attributes: {
      exclude: ['username']
    },
    include: [
      {
        model: Attendee,
        attributes: ['status'],
        as: 'Attendance'
      }
    ]
  });

  if (event) {
    const group = await Group.findOne({
      where: { organizerId: user.id }
    });

    if (user.id !== group.organizerId) {
      const pendingAttendees = await Attendee.findAll({
        attributes: {
          exclude: ['username']
        },
        include: [
          {
            model: Attendee,
            where: { status: ['attending', 'waitlist'] },
            attributes: ['status'],
            as: 'Attendance'
          }
        ]
      });

      return res.json({ Attendees: pendingAttendees });
    } else {
      return res.json({ Attendees: attendees });
    }
  } else {
    return res.status(404).json({
      message: "Event couldn't be found",
      statusCode: 404
    });
  }
});

//POST request to attend an event based on event ID
router.post('/:eventId/attendance', requireAuth, async (req, res) => {
  const { user } = req;
  const eventId = Number(req.params.eventId);
  const event = await Event.findByPk(eventId);
  const member = await Membership.findOne({
    where: { userId: user.id }
  });

  if (event) {

    if (user.id === member.userId) {
      const attendee = await Attendee.findOne({
        where: { userId: user.id }
      });

      if (!attendee) {
        const newAttendee = await Attendee.create({
          userId: user.id, eventId: eventId, status: 'pending'
        });

        return res.json({
          userId: newAttendee.userId,
          status: newAttendee.status
        });
      }

      if (attendee.status === 'pending') {
        return res.status(400).json({
          message: "Attendance has already been requested",
          statusCode: 400
        });
      } else {
        return res.status(400).json({
          message: "User is already an attendee of the event",
          statusCode: 400
        });
      }
    }
  } else {
    return res.status(404).json({
      message: "Event couldn't be found",
      statusCode: 404
    });
  }
});

//PUT change status of attendance by event ID
router.put('/:eventId/attendance', requireAuth, async (req, res) => {
  const { user } = req;
  const { status } = req.body;
  const eventId = Number(req.params.eventId);
  const event = await Event.findByPk(eventId);
  const group = await Group.findOne({
    where: { organizerId: user.id }
  });

  if (event) {
    const organizerId = group.organizerId;
    if (user.id === organizerId) {
      const attendee = await Attendee.findOne({
        where: { eventId: eventId }
      });

      if (!attendee) {
        return res.status(404).json({
          message: "Attendance between the user and the event does not exist",
          statusCode: 404
        });
      } else if (status === 'pending') {
        return res.status(400).json({
          message: "Cannot change an attendance status to pending",
          statusCode: 400
        });
      } else {
        attendee.status = status;

        await attendee.save();

        return res.json({
          id: attendee.id,
          eventId: eventId,
          userId: attendee.userId,
          status: attendee.status
        });
      }
    }
  } else {
    return res.status(404).json({
      message: "Event couldn't be found",
      statusCode: 404
    });
  }


});

//DELETE attendance based on event ID
router.delete('/:eventId/attendance', requireAuth, async (req, res) => {
  const { user } = req;
  const eventId = Number(req.params.eventId);
  const attendance = await Attendee.findByPk(eventId);

  if (attendance) {
    Attendee.destroy({
      where: { eventId: eventId }
    })

    return res.json({
      message: "Successfully deleted attendance from event"
    });
  } else {
    return res.status(404).json({
      message: "Event couldn't be found",
      statusCode: 404
    });
  }
});

//DELETE event by Id
router.delete('/:eventId', requireAuth, async (req, res) => {
  const eventId = Number(req.params.eventId);
  const event = await Event.findByPk(eventId);

  if (event) {
    Event.destroy({
      where: { id: eventId }
    });

    return res.json({
      message: "Successfully deleted"
    });
  } else {
    return res.status(404).json({
      message: "Event couldn't be found",
      statusCode: 404
    });
  }
});

module.exports = router;
