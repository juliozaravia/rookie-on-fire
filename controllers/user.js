const { request, response } = require('express');

const getUsers = (req = request, res = response) => {
  const { lorem, ipsum } = req.query;

  res.json({
    msg: 'get API',
    lorem,
    ipsum
  });
};

const createUsers = (req, res = response) => {
  const { lorem, ipsum } = req.body;

  res.json({
    msg: 'create API',
    lorem,
    ipsum
  });
};

const editUsers = (req, res = response) => {
  const { id } = req.params;

  res.json({
    msg: 'edit API',
    id
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
