const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

exports.createUser = async (req, res) => {
    
    if (!req.body.email) {
        res.status(400).send({
          message: "Content cannot be empty!"
        });
      }
      
      const newUser = {
        email: req.body.email,
        username: req.body.username,
        active: req.body.active ? req.body.active : false
      };
      
      Users.create(newUser)
        .then(data => {
          res.send(data);
        })
        .catch(err => {
         res.status(500).send({
            message:
              err.message || "An error occurred while creating the user."
          });
        });
};

exports.findAllUsers = (req, res) => {
    const email = req.query.email;
    let condition = email ? { email: { [Op.like]: `%${email}%` } } : null;
    Users.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "An error occurred while retrieving users."
        });
        return;
      });
};

exports.findUser = (req, res) => {
    const id = req.params.id;
    Users.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find user with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving user with id=" + id
        });
      });
};

exports.updateUser = (req, res) => {
    const id = req.params.id;
    Users.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update user with id=${id}. User was not found or request is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
};

exports.deleteUser = (req, res) => {
    const id = req.params.id;
    Users.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "User was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete user with id=${id}. User was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete user with id=" + id
        });
      });
};

exports.deleteAllUsers = (req, res) => {
    Users.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} users were deleted successfully!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "An error occurred while removing all users."
          });
        });
};

exports.findAllActiveUsers = (req, res) => {
    Users.findAll({ where: { active: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "An error occurred while retrieving users."
        });
      });
  };