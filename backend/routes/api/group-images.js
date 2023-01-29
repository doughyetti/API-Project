const express = require('express')

const { restoreUser, requireAuth } = require('../../utils/auth');
const { groupsImage } = require('../../db/models');

const router = express.Router();

router.use(restoreUser);

//DELETE an image for a group
router.delete('/:imageId', requireAuth, async (req, res) => {
  const imageId = Number(req.params.imageId);
  const groupImages = await groupsImage.findByPk(imageId);

  if (groupImages) {
    groupImages.destroy({
      where: { id: imageId }
    });

    return res.json({
      message: "Successfully deleted",
      statusCode: 200
    });
  } else {
    return res.status(404).json({
      message: "Group Image couldn't be found",
      statusCode: 404
    });
  }
});


module.exports = router;
