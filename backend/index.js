require('dotenv').config();

const express = require('express');
const { userRouter } = require('./routes/user.js');
const { expenseRouter } = require('./routes/expense.js');
const { default: mongoose } = require('mongoose');

const dns = require('dns');
dns.setServers([
  "1.1.1.1",
  "8.8.8.8"
]);

const app = express();
app.use(express.json());

app.use('/user', userRouter);
app.use('/expense', expenseRouter);

async function main() {
  await mongoose.connect(process.env.MONGO_URL);

  console.log("connection successfull")

  app.listen(3000, () => {
    console.log("server is running on port 3000")
  })
}

main();