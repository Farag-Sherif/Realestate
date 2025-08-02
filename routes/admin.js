const express = require("express");
const adminRouter = express.Router();
const admin = require("../middlewares/admin");
const { Product } = require("../models/product");
const Order = require("../models/order");
const { PromiseProvider } = require("mongoose");

// Add product
adminRouter.post("/admin/add-product", admin, async (req, res) => {
  try {
    const {
      title,
      description,
      images,
      price,
      location,
      type,
      bedrooms,
      bathrooms,
      area,
      category,
      quantity,
      status,
    } = req.body;

    let product = new Product({
      title,
      description,
      images,
      price,
      location,
      type,
      bedrooms,
      bathrooms,
      area,
      category,
      quantity,
      status,
    });

    product = await product.save();
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get all your products
adminRouter.get("/admin/get-products", admin, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Delete the product
adminRouter.post("/admin/delete-product", admin, async (req, res) => {
  try {
    const { id } = req.body;
    let product = await Product.findByIdAndDelete(id);
    res.json(product);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

adminRouter.get("/admin/get-orders", admin, async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

adminRouter.post("/admin/change-order-status", admin, async (req, res) => {
  try {
    const { id, status } = req.body;
    let order = await Order.findById(id);
    order.status = status;
    order = await order.save();
    res.json(order);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

adminRouter.get("/admin/analytics", admin, async (req, res) => {
  try {
    const orders = await Order.find({});
    let totalEarnings = 0;

    for (let order of orders) {
      for (let p of order.products) {
        totalEarnings += p.quantity * p.product.price;
      }
    }

    let apartmentEarnings = await fetchTypeWiseEarnings("Apartment");
    let villaEarnings = await fetchTypeWiseEarnings("Villa");

    let earnings = {
      totalEarnings,
      apartmentEarnings,
      villaEarnings,
    };

    res.json(earnings);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

async function fetchTypeWiseEarnings(type) {
  let earnings = 0;
  let categoryOrders = await Order.find({
    "products.product.type": type,
  });

  for (let order of categoryOrders) {
    for (let p of order.products) {
      earnings += p.quantity * p.product.price;
    }
  }
  return earnings;
}

module.exports = adminRouter;


// to get all users 
const User = require("../models/user");

// Get all users
adminRouter.get("/admin/get-users", admin, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = adminRouter;