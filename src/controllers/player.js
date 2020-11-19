const {
  getAllPlayers,
  addNewPlayer,
  getByPlayerId,
  setArmPlayer,
  setHealthPlayer,
  atackPlayer,
  stealPlayer,
  resurrectPlayer,
  setObject,
} = require("../utils");

/**
 *
 * CLIENT CONTROLLERS
 *
 * */

//Get all players
const allPlayers = async (req, res, next) => {
  try {
    const players = await getAllPlayers();
    res.status(200).send(players);
  } catch (err) {
    next(err);
  }
};

//Get by id
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getByPlayerId(id);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

//Arm player with object
const armPlayer = async (req, res, next) => {
  try {
    const { id, armId } = req.params;
    const result = await setArmPlayer(id, armId);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

//Add player
const addPlayers = async (req, res, next) => {
  try {
    const { body } = req;
    const result = await addNewPlayer(body);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

//Kill player
const killPlayer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await setHealthPlayer(id);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

//Atack player
const atack = async (req, res, next) => {
  try {
    const { id, target } = req.params;
    const result = await atackPlayer(id, target);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

//Steal bag from player
const steal = async (req, res, next) => {
  try {
    const { id, target } = req.params;
    const result = await stealPlayer(id, target);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

//Kill player
const resurrect = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await resurrectPlayer(id);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

//Use object
const useObject = async (req, res, next) => {
  try {
    const { id, objectId } = req.params;
    const { player } = req.query;
    const result = await setObject(id, objectId, player);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  allPlayers,
  addPlayers,
  getById,
  armPlayer,
  killPlayer,
  atack,
  steal,
  resurrect,
  useObject,
};
