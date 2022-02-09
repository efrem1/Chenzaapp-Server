const { User } = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = {
  async get(id) {
    return User.findByPk(id);
  },
  async getMany(ids) {
    return User.findAll({ where: { id: ids } });
  },
  async create(user) {
    const password = bcrypt.hashSync(user.password, 10);
    return User.create({
      firstname: user.firstname,
      lastname: user.lastname,
      password: password,
      email: user.email,
      mobile: user.mobile,
      username: user.username,
      about: user.about,
      gender: user.gender,
      color: user.color,
      mood: user.mood,
      dob: new Date(),
    });
  },
  async find(params) {
    const { first, after, firstname, lastname, orderBy } = params;
    const order = [];
    if (Array.isArray(orderBy)) {
      orderBy.forEach((ob) => {
        order.push(ob.field);
        order.push(ob.direction);
      });
    }
    return User.findAll({
      where: {
        [Op.or]: [
          {
            firstname: {
              [Op.like]: `%${firstname}%`,
            },
          },
          {
            lastname: {
              [Op.like]: `%${lastname}%`,
            },
          },
        ],
      },
      order: [order],
      limit: first,
      offset: after,
    });
  },
  async count(params) {
    const { firstname, lastname } = params;
    return User.count({
      where: {
        [Op.or]: [
          {
            firstname: {
              [Op.like]: `%${firstname}%`,
            },
          },
          {
            lastname: {
              [Op.like]: `%${lastname}%`,
            },
          },
        ],
      },
    });
  },
};
