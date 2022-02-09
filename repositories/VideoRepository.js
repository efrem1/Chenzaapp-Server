const { Videos } = require("../models");

module.exports = {
  async get(id) {
    return Videos.findByPk(id);
  },
  async getMany(ids) {
    return Videos.findAll({ where: { id: ids } });
  },
  async create(video) {
    return Videos.create({
      filename: video.filename,
      caption: video.caption,
      post_id: video.post_id,
      size: video.size,
      width: video.width,
      height: video.height,
      ratio: video.ratio,
      type: video.type,
      created_at: new Date(),
      updated_at: new Date(),
      published_at: new Date(),
    });
  },
  async find(params) {
    const { first, after, post_id } = params;
    return Videos.findAll({
      where: { post_id: post_id },
      limit: first,
      offset: after,
    });
  },
  async count(params) {
    const { post_id } = params;
    return Videos.count({ where: { post_id: post_id } });
  },
};
