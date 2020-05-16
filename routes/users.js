const router = require('express').Router();
const {
  login,
  register,
  updateusername,
  getUserDetails,
} = require('../controllers/users');

const { check } = require('express-validator');
const auth = require('../middleware/auth');
/*
    @method POST
    @route  api/user/login
    @desc user Login
    @access public
*/

router.post(
  '/login',
  [
    check('email', 'All field are required').isEmail().not().isEmpty(),
    check('password', 'All field are required').not().isEmpty(),
  ],
  login
);

/*
    @method POST
    @route  api/user/register
    @desc user register
    @access public
*/
router.post(
  '/register',
  [
    check('name', 'please input your name')
      .isLength({ min: 5 })
      .not()
      .isEmpty(),
    check('email', 'please check email')
      .isEmail()
      .isLength({ min: 5 })
      .not()
      .isEmpty(),
    check('password', 'please input your password again')
      .isLength({ min: 5 })
      .not()
      .isEmpty(),
    check('username', 'please input your username')
      .isLength({ min: 5 })
      .not()
      .isEmpty(),
  ],
  register
);

/*
    @method PATCH
    @route  api/user/register
    @desc user update username
    @access public
*/
router.patch('/updateusername', auth, updateusername);
/*
    @method PATCH
    @route  api/user/register
    @desc user update username
    @access public and private
*/
router.get('/getUserInfo/:userId', getUserDetails);

module.exports = router;
