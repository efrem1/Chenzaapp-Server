const { Photos } = require("../models");

module.exports = {
  async get(id) {
    return Photos.findByPk(id);
  },
  async getMany(ids) {
    return Photos.findAll({ where: { id: ids } });
  },
  async create(photo) {
    return Photos.create({
      filename: photo.filename,
      caption: photo.caption,
      size: photo.size,
      width: photo.width,
      height: photo.height,
      ratio: photo.ratio,
      type: photo.type,
      post_id: photo.post_id,
      created_at: new Date(),
      updated_at: new Date(),
      published_at: new Date(),
    });
  },
  async find(params) {
    const { first, after, post_id } = params;
    return Photos.findAll({
      where: { post_id: post_id },
      limit: first,
      offset: after,
    });
  },
  async count(params) {
    const { post_id } = params;
    return Photos.count({ where: { post_id: post_id } });
  },
};
