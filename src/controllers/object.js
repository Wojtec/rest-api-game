const {
  addNewObject,
  getByObjectId,
  removeObject,
  upgradeThisObject,
} = require("../utils");

/**
 *
 * CLIENT CONTROLLERS
 *
 * */

//Add new object
const addObject = async (req, res, next) => {
  try {
    const { body } = req;
    const createObject = await addNewObject(body);

    res.send(createObject);
  } catch (err) {
    next(err);
  }
};

//Get by id
const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getByObjectId(id);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

//Remove object
const destroyObject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeObject(id);
    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
};

//Upgrade object
const upgradeObject = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    const result = await upgradeThisObject(id, value);
    res.status(200).send(result);
  } catch (err) {}
};

module.exports = {
  addObject,
  getById,
  destroyObject,
  upgradeObject,
};
