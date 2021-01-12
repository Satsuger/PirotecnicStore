const path = require("path");
const fs = require("fs");
const { countReset } = require("console");

const p = path.join(__dirname, "..", "data", "card.json");

class Card {
  static async add(product) {
    const card = await Card.fetch();

    const idx = card.products.findIndex((p) => p.id === product.is);

    if (idx >= 0) {
      // product already there
      card.products[idx].count++;
    } else {
      // add product
      product.count = 1;
      card.products.push(product);
    }

    card.price += +product.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(card), (err) => {
        err ? reject() : resolve();
      });
    });
  }

  static async remove(id) {
    const card = await Card.fetch();
    const idx = card.products.findIndex((p) => p.id === id);
    const product = card.products[idx];

    if (product.count === 1) card.products = card.products.filter((p) => p.id !== id);
    else card.products[idx].count--;
    
    card.price -= product.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(p, JSON.stringify(card), (err) => {
        err ? reject() : resolve(card);
      });
    });
  }

  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(p, "utf-8", (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content));
        }
      });
    });
  }
}

module.exports = Card;
