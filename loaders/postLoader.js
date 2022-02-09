const DataLoader = require("dataloader");
const PostRepository = require("../repositories/PostRepository");
async function getPostById(ids) {
  const posts = await PostRepository.getMany(ids);
  return ids.map((id) => {
    return posts.find((post) => post.id === id);
  });
}

module.exports = new DataLoader(getPostById);
