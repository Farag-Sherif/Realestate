// // IMPORTS FROM PACKAGES
// const express = require("express");
// const mongoose = require("mongoose");
// const adminRouter = require("./routes/admin");
// const authRouter =require("./routes/auth");
// const productRouter =require("./routes/product");
// const userRouter =require("./routes/user");
// require('dotenv').config();

// // INIT
// const PORT =  5000;
// const app = express();
// const DB =`${process.env.dbUri}`;
// // middleware
// app.use(express.json());
// app.use(authRouter);
// app.use(adminRouter);
// app.use(productRouter);
// app.use(userRouter);

// // Connections
// mongoose
//   .connect(DB)
//   .then(() => {
//     console.log("Connection Successful");
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`connected at port ${PORT}`);
// });
// IMPORTS FROM PACKAGES


// ==================================================================
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors"); // Import the cors package
// const adminRouter = require("./routes/admin");
// const authRouter = require("./routes/auth");
// const productRouter = require("./routes/product");
// const userRouter = require("./routes/user");
// require('dotenv').config();

// // INIT
// const PORT = 5000;
// const app = express();
// const DB = `${process.env.dbUri}`;

// // Middleware
// app.use(express.json());
// app.use(cors()); // Enable CORS for all routes

// // Routes
// app.use(authRouter);
// app.use(adminRouter);
// app.use(productRouter);
// app.use(userRouter);

// // Connections
// mongoose
//   .connect(DB)
//   .then(() => {
//     console.log("Connection Successful");
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`connected at port ${PORT}`);
// });
// ===============================================

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const adminRouter = require("./routes/admin");
// const authRouter = require("./routes/auth");
// const productRouter = require("./routes/product");
// const userRouter = require("./routes/user");
// require('dotenv').config();

// // INIT
// const PORT = 5000;
// const app = express();
// const DB = `${process.env.dbUri}`;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Routes
// app.use(authRouter);
// app.use(adminRouter);
// app.use(productRouter);
// app.use(userRouter);

// // Connections
// mongoose
//   .connect(DB)
//   .then(() => {
//     console.log("Connection Successful");
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`connected at port ${PORT}`);
// });
// =========================== 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRouter = require("./routes/admin");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");
require('dotenv').config();

// INIT
const PORT = 5000;
const app = express();
const DB = `${process.env.dbUri}`;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use(authRouter);
app.use(adminRouter);
app.use(productRouter);
app.use(userRouter);

// Connections
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((e) => {
    console.log(e);
  });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`connected at port ${PORT}`);
});