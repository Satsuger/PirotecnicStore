const { v4 } = require("uuid");
const path = require("path");
const fs = require("fs");

class Product {
  constructor(title, price, image) {
    this.title = title;
    this.price = price;
    this.image = image;
    this.id = v4();
  }

  toJSON() {
    return {
      title: this.title,
      price: this.price,
      image: this.image,
      id: this.id,
    };
  }

  async save() {
    const products = await Product.getAll();
    products.push(this.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "products.json"),
        JSON.stringify(products),
        (err) => {
          err ? reject(err) : resolve();
        }
      );
    });
  }

  static async update(product) {
    const products = await Product.getAll();

    const index = products.findIndex((p) => p.id === product.id);
    products[index] = product;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "products.json"),
        JSON.stringify(products),
        (err) => {
          err ? reject(err) : resolve();
        }
      );
    });
  }

  static async getById(id) {
    const products = await Product.getAll();
    return products.find((item) => item.id === id);
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "products.json"),
        "utf-8",
        (err, content) => {
          if (err) reject(err);
          else resolve(JSON.parse(content));
        }
      );
    });
  }
}

module.exports = Product;
