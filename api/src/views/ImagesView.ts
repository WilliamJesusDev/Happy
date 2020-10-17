import Image from "../models/Image";

const env = process.env;

const baseURL = env.API_URL
  ? `${env.API_URL}:${env.PORT}/${env.API_PATH}`
  : "http://localhost:3333/api/v1";

export default {
  render(image: Image) {
    return {
      id: image.id,
      url: `${baseURL}/uploads/${image.path}`,
    };
  },

  renderMany(images: Image[]) {
    return images.map((image) => this.render(image));
  },
};
