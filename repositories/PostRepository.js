const { Posts } = require("../models");

module.exports = {
  async get(id) {
    return Posts.findByPk(id);
  },
  async getMany(ids) {
    return Posts.findAll({ where: { id: ids } });
  },
  async create(post) {
    return Posts.create({
      content: post.content,
      parent_id: post.parent_id,
      user_id: post.user_id,
      created_at: new Date(),
      updated_at: new Date(),
      published_at: new Date(),
    });
  },
  async find(params) {
    const { first, after, orderBy } = params;
    const order = [];
    if (Array.isArray(orderBy)) {
      orderBy.forEach((ob) => {
        order.push(ob.field);
        order.push(ob.direction);
      });
    }
    return Posts.findAll({
      order: [order],
      limit: first,
      offset: after,
    });
  },
  async count(params) {
    return Posts.count();
  },
};
