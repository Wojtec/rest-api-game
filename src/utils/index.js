const fs = require("fs").promises;
const { json } = require("body-parser");
const path = require("path");
const dataPlayersPATH = path.join(__dirname, "../Database/players.json");
const dataObjectPATH = path.join(__dirname, "../Database/objects.json");

/**
 *
 * ACTIONS FOR API INTEGRATION
 *
 * */

const player = {
  id: null,
  name: "",
  age: null,
  health: null,
  bag: [],
};

const object = {
  id: null,
  name: "",
  value: "",
};

//PLAYERS

//Get all players form json file
const getAllPlayers = async () => {
  try {
    const dataPlayers = await fs.readFile(dataPlayersPATH, "utf8");
    return JSON.parse(dataPlayers);
  } catch (err) {
    console.log(err);
  }
};

//Add new player to json file
const addNewPlayer = async (body) => {
  try {
    player.id = Math.random().toString(36).substr(2, 7);
    player.name = body.name;
    player.age = Number(body.age);
    player.health = Number(body.health);
    player.bag.push(body.bag);
    console.log(player);
    const response = await storeInDatabase(player, dataPlayersPATH);
    return response;
  } catch (err) {
    console.log(err);
  }
};

//Get player by id
const getByPlayerId = async (id) => {
  try {
    const player = await getElementById(id, dataPlayersPATH);
    return player;
  } catch (err) {
    console.log(err);
  }
};

//Set arm a player
// + BONUS Implement pick up item endpoint: one player add to its bag one item that doesn't belong to any other player.
const setArmPlayer = async (id, armID) => {
  try {
    const checkObject = await getByObjectId(armID);
    if (typeof checkObject !== "string") {
      const checkObjectInPlayer = await playerObjectCheck(checkObject);
      if (checkObjectInPlayer) {
        return "Item does belong to another player.";
      } else {
        const getPlayers = await getAllPlayers();
        const getPlayer = getPlayers.find((p) => p.id === id);
        getPlayer.bag.push(checkObject.id);
        await fs.writeFile(dataPlayersPATH, JSON.stringify(getPlayers));
        return getPlayer;
      }
    } else {
      return checkObject;
    }
  } catch (err) {
    console.log(err);
  }
};

//Kill player
const setHealthPlayer = async (id) => {
  try {
    let health = 0;
    const getPlayers = await getAllPlayers();
    const player = getPlayers.find((p) => p.id === id);
    player.health = health;
    await fs.writeFile(dataPlayersPATH, JSON.stringify(getPlayers));
    return player;
  } catch (err) {
    console.log(err);
  }
};

//Atack player
const atackPlayer = async (id, target) => {
  try {
    const getPlayers = await getAllPlayers();
    const getPlayer = getPlayers.find((p) => p.id === id);
    const { bag } = getPlayer;
    const object = await getByObjectId(bag[0]);
    const getTarget = getPlayers.find((p) => p.id === target);
    getTarget.health += Number(object.value);
    await fs.writeFile(dataPlayersPATH, JSON.stringify(getPlayers));

    return getTarget;
  } catch (err) {
    console.log(err);
  }
};

//Steal player
const stealPlayer = async (id, target) => {
  try {
    const getPlayers = await getAllPlayers();
    const getPlayer = getPlayers.find((p) => p.id === id);
    const getTarget = getPlayers.find((p) => p.id === target);
    getPlayer.bag.push(...getTarget.bag);
    getTarget.bag = [];
    await fs.writeFile(dataPlayersPATH, JSON.stringify(getPlayers));
    return getPlayer;
  } catch (err) {
    console.log(err);
  }
};

//Resurrect Player
const resurrectPlayer = async (id) => {
  try {
    let health = 100;
    const getPlayers = await getAllPlayers();
    const player = getPlayers.find((p) => p.id === id);
    player.health = health;
    await fs.writeFile(dataPlayersPATH, JSON.stringify(getPlayers));
    return player;
  } catch (err) {
    console.log(err);
  }
};

//Use object against another player or itself
const setObject = async (id, objectId, player) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

//OBJECTS
//Add new object to json file
const addNewObject = async (body) => {
  try {
    object.id = Math.random().toString(36).substr(2, 7);
    object.name = body.name;
    object.value = body.value;
    const response = await storeInDatabase(object, dataObjectPATH);
    return response;
  } catch (err) {
    console.log(err);
  }
};

//Get object by id
const getByObjectId = async (id) => {
  try {
    const object = await getElementById(id, dataObjectPATH);
    return object;
  } catch (err) {
    console.log(err);
  }
};

//Remove object from json file
const removeObject = async (id) => {
  try {
    const dataObjects = await fs.readFile(dataObjectPATH, "utf8");
    const parseObjects = JSON.parse(dataObjects);
    const index = parseObjects.findIndex((o) => o.id === id);
    if (index !== undefined) parseObjects.splice(index, 1);
    await fs.writeFile(dataObjectPATH, JSON.stringify(parseObjects));
    return parseObjects;
  } catch (err) {
    console.log(err);
  }
};

//Upgrade object
const upgradeThisObject = async (id, value) => {
  try {
    const dataObjects = await fs.readFile(dataObjectPATH, "utf8");
    const parseObjects = JSON.parse(dataObjects);
    const object = parseObjects.find((o) => o.id === id);
    object.value = value;
    await fs.writeFile(dataObjectPATH, JSON.stringify(parseObjects));
    return parseObjects;
  } catch (err) {
    console.log(err);
  }
};

//Helpers

//Store data in json files
const storeInDatabase = async (data, path) => {
  try {
    const db = await fs.readFile(path, "utf8");
    const parseDatabase = JSON.parse(db);
    const find = parseDatabase.find((ele) => ele.name === data.name);
    if (find) {
      return `${data.name} already exists.`;
    } else {
      parseDatabase.push(data);
      await fs.writeFile(path, JSON.stringify(parseDatabase));
      return parseDatabase;
    }
  } catch (err) {
    console.log(err);
  }
};

//Get data by id from json files
const getElementById = async (id, path) => {
  try {
    const db = await fs.readFile(path, "utf8");
    const parseDatabase = JSON.parse(db);
    const find = parseDatabase.find((ele) => ele.id === id);
    if (find) {
      return find;
    } else {
      return "Not exists";
    }
  } catch (err) {
    console.log(err);
  }
};

const playerObjectCheck = async (checkObject) => {
  const getPlayers = await getAllPlayers();

  const checkObjectUseByPlayer = getPlayers.some((p) => {
    const checkPlayersObject = p.bag.find((b) => b === checkObject.id);
    return checkPlayersObject;
  });

  return checkObjectUseByPlayer;
};

module.exports = {
  //PLAYERS
  getAllPlayers,
  addNewPlayer,
  getByPlayerId,
  setArmPlayer,
  setHealthPlayer,
  atackPlayer,
  stealPlayer,
  resurrectPlayer,
  //OBJECTS
  addNewObject,
  getByObjectId,
  removeObject,
  upgradeThisObject,
};
