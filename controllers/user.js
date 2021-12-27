const { response } = require('express');

const getUsers = (req, res = response) => {
  res.json({
    msg: 'get API'
  });
};

const createUsers = (req, res = response) => {
  res.json({
    msg: 'create API'
  });
};

const editUsers = (req, res = response) => {
  res.json({
    msg: 'edit API'
  });
};

const deleteUsers = (req, res = response) => {
  res.json({
    msg: 'delete API'
  });
};

module.exports = {
  getUsers,
  createUsers,
  editUsers,
  deleteUsers
};
