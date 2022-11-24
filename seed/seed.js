import mongoose from "mongoose";
import RecordsCollection from "../Models/recordSchema.js";
import UsersCollection from "../Models/userSchema.js";
import OrdersCollection from "../Models/orderSchema.js";
import { faker } from "@faker-js/faker";

mongoose.connect("mongodb://127.0.0.1:27017/live-coding-shop", () => {
  console.log("connected to DB.........");
});

async function addFakeRecords() {
  const recordPromises = Array(16)
    .fill(null)
    .map(() => {
      const record = new RecordsCollection({
        title: faker.commerce.productName(),
        author: faker.name.fullName(),
        year: faker.date.past().getFullYear(),
        img: faker.image.image(),
        price: faker.commerce.price(),
      });
      return record.save();
    });
  await Promise.all(recordPromises);
  mongoose.connection.close();
}

addFakeRecords();

async function addFakeUsers() {
  const userPromises = Array(10)
    .fill(null)
    .map(() => {
      const user = new UsersCollection({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
      return user.save();
    });
  await Promise.all(userPromises);
  mongoose.connection.close();
}
//addFakeUsers()

async function addFakeOrders() {
  const orderPromises = Array(10)
    .fill(null)
    .map(() => {
      const order = new OrdersCollection({
        records: [faker.commerce.productAdjective()],
        totalPrice: faker.commerce.price(),
      });
      return order.save();
    });
  await Promise.all(orderPromises);
  mongoose.connection.close();
}

//addFakeOrders();

