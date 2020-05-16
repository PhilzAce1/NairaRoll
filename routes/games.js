const router = require('express').Router();
const {
  getAllCurrentGames,
  createNewGame,
  joinAGame,
  getGameinfo,
  endGame,
  //   deleteGame,
  removeUserFromGame,
  addUserToGame,
} = require('../controllers/games');

/*
    @route  api/games/allcurrentgames
    @desc get all games that are ongoing
    @access private
*/
router.get('/allcurrentgames/?price', getAllCurrentGames);

/*
    @route  api/games/createnewgame
    @desc create a new game
    @access private
*/
router.post('/createnewgame', createNewGame);
/*
    @route  api/games/joingame
    @desc get all games that are ongoing
    @access private
*/
router.post('/joingame', joinAGame);
/*
    @route  api/games/getgameinfo
    @desc get all games that are ongoing
    @access public
*/
router.get('/gameinfo/:gameId', getGameinfo);
/*
    @route  api/endgame
    @desc end a current game
    @access private
*/
router.post('/endgame', auth, endGame);

/* 
    @route api/removeuser
    @desc remove a user from a current game 
    @access Private
*/
router.patch('/removeuser', auth, removeUserFromGame);
/*
    @route  api/adduser
    @desc 
    @access private
*/
router.patch('/adduser', auth, addUserToGame);

module.exports = router;
