const express = require('express')

const { restoreUser, requireAuth } = require('../../utils/auth');
const { Group, User, Venue } = require('../../db/models');

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
  const userId = User.getCurrentUserById(req.user.id)
  const Groups = await Group.findAll({ where: { userId } });

  return res.json({ Groups });
});

//GET Group from id
router.get('/:groupId', async (req, res) => {
  const groupId = req.params.groupId;
  const group = await Group.findOne({
    where: {id: groupId},
    include: [
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

module.exports = router;
