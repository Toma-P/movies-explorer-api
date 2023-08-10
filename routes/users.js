const router = require('express').Router();
const {
  getCurrentUser,
  updateUserInfo,
} = require('../controllers/users');
const {
  updateUserInfoValidate,
  userIdValidate,
} = require('../middlewares/validation');

router.get('/me', userIdValidate, getCurrentUser);
router.patch('/me', updateUserInfoValidate, updateUserInfo);

module.exports = router;
