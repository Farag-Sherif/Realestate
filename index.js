const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'https://book-store-react-js.netlify.app' // حدد المنشأ الخاص بك
}));

// Routes
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

// Connection to MongoDB
mongoose
  .connect(process.env.dbUri)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });

// Export for Railway or other serverless environments
module.exports = app;

// Local development only (remove or comment for production)
// app.listen(5000, "0.0.0.0", () => {
//   console.log(`connected at port 5000`);
// });
