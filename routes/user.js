const { Router } = require('express');
const {
  getUsers,
  createUsers,
  editUsers,
  deleteUsers
} = require('../controllers/user');

const router = Router();

router.get('/', getUsers);
router.post('/', createUsers);
router.put('/:id', editUsers);
router.delete('/', deleteUsers);

module.exports = router;
