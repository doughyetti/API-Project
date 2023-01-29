const express = require('express')

const { restoreUser, requireAuth } = require('../../utils/auth');
const { eventsImage } = require('../../db/models');

const router = express.Router();

router.use(restoreUser);

//DELETE an image for an event
router.delete('/:imageId', requireAuth, async (req, res) => {
  const imageId = Number(req.params.imageId);
  const eventImage = await eventsImage.findByPk(imageId)

  if (eventImage) {
    eventsImage.destroy({
      where: { id: imageId }
    });

    return res.json({
      message: "Successfully deleted",
      statusCode: 200
    });
  } else {
    return res.status(404).json({
      message: "Event Image couldn't be found",
      statusCode: 404
    });
  }
});


module.exports = router;
