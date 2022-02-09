const DataLoader = require("dataloader");
const PhotoRepository = require("../repositories/PhotoRepository");
async function getPhotoById(ids) {
  const photos = await PhotoRepository.getMany(ids);
  return ids.map((id) => {
    return photos.find((photo) => photo.id === id);
  });
}

module.exports = new DataLoader(getPhotoById);
