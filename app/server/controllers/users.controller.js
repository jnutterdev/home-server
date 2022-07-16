const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

exports.createUser = async (req, res) => {
    
    if (!req.body.email) {
        res.status(400).send({
          message: "Content can not be empty!"
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
            err.message || "Some error occurred while retrieving tutorials."
        });
        return;
      });
};

exports.findUser = (req, res) => {
  
};

exports.updateUser = (req, res) => {
  
};

exports.deleteUser = (req, res) => {
  
};

exports.deleteAllUsers = (req, res) => {
  
};
