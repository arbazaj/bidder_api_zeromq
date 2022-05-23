"use strict";

const crypto = require('crypto');
const ALGORITHM = 'aes256';
const BUFFER_BIT = 32;
const HEX = "hex";

module.exports = {
  findRandom: (maxRandomNo) => Math.floor(Math.random() * maxRandomNo),
  encrypt: (plainText, password) => {
    const KEY = Buffer.alloc(BUFFER_BIT, password, "base64");
    const RANDOM_BYTES = 16;
    const iv = crypto.randomBytes(RANDOM_BYTES);
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(KEY), iv);
    let encrypted = cipher.update(plainText);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return `${encrypted.toString(HEX)}_${iv.toString(HEX)}`;
  },
  decrypt: (iv, encryptedText, password) => {
    const secret = password;
    const KEY = Buffer.alloc(BUFFER_BIT, secret, "base64");
    iv = Buffer.from(iv, HEX);
    encryptedText = Buffer.from(encryptedText, HEX);
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
  }
};
