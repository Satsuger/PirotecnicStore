const { v4 } = require("uuid");
const path = require("path");
const fs = require("fs");

class Nigger {
  constructor(name, price, image) {
    this.name = name;
    this.price = price;
    this.image = image;
    this.id = v4();
  }

  toJSON() {
    return {
      name: this.name,
      price: this.price,
      image: this.image,
      id: this.id,
    };
  }

  async save() {
    const niggers = await Nigger.getAll();
    niggers.push(this.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "niggers.json"),
        JSON.stringify(niggers),
        (err) => {
          err ? reject(err) : resolve();
        }
      );
    });
  }

  static async getById(id) {
    const niggers = await Nigger.getAll();
    return niggers.find(item => item.id === id)
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "niggers.json"),
        "utf-8",
        (err, content) => {
          if (err) reject(err);
          else resolve(JSON.parse(content));
        }
      );
    });
  }
}

module.exports = Nigger;
