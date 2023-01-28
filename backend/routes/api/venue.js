const express = require('express')

const { restoreUser, requireAuth } = require('../../utils/auth');
const { Group, User, Venue } = require('../../db/models');

const router = express.Router();

router.use(restoreUser);

//PUT venue specified by ID
router.put('/:venueId', requireAuth, async (req, res) => {
  const { user } = req;
  const { address, city, state, lat, lng } = req.body;
  const venueId = Number(req.params.venueId);
  const venue = await Venue.findByPk(venueId, {
    attributes: {
      exclude: ['createdAt', 'updatedAt']
    }
  });

  if (venue) {
    const groupId = venue.groupId
    const group = await Group.findByPk(groupId);
    const organizerId = group.organizerId;

    if (user.id === organizerId) {
      venue.address = address;
      venue.city = city;
      venue.state = state;
      venue.lat = lat;
      venue.lng = lng;

      await venue.save();

      return res.json(venue);
    } else {
      return res.status(403).json({
        message: "User not authorized to update venue",
        statusCode: 403
      });
    }
  } else {
    return res.status(404).json({
      message: "Venue couldn't be found",
      statusCode: 404
    });
  }
});

module.exports = router;
