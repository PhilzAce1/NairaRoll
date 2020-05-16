const User = require('../models/User');
const Game = require('../models/Game');

exports.getAllCurrentGames = (req, res, next) => {
  // get all games with property 'onGoing':true
  // send all games in a paginated form
};
exports.createNewGame = (req, res, next) => {
  // validate
  // created game
};
exports.joinAGame = (req, res, next) => {
  // validate gameId
  // check how much user have
  // if it is up to the required amount let user join
  // remove the amont from the user bal
  // add the amount to the game bal
  // then add user to the game
  // send success , the userdetails gmae details
};
exports.getGameinfo = (req, res, next) => {
  // validate user param
  // check for game
  // send game details
};

exports.endGame = (req, res, next) => {
  // send game id
  // update ongoing to false
  // update the users result
};
exports.deleteGame = (req, res, next) => {
  // user must be author || admin and game must exist
  // if the user is not the author ... tell him
  // then delete game
};
exports.removeUserFromGame = (req, res, next) => {
  // validate user input
  // user  must be admin or creator of game
  // remove the user from game
};
exports.addUserToGame = (req, res, next) => {
  // add user with the user Id
};
