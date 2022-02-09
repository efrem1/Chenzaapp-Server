const DataLoader = require("dataloader");
const UserRepository = require("../repositories/UserRepository");
async function getUserById(ids) {
  const users = await UserRepository.getMany(ids);
  return ids.map((id) => {
    return users.find((user) => user.id === id);
  });
}

module.exports = new DataLoader(getUserById);
