
const express = require("express");
const productRouter = express.Router();
const auth = require("../middlewares/auth");
const { Product } = require("../models/product");

// Utility function for error handling
const handleError = (res, error) => {
  res.status(500).json({ error: error.message });
};

// Get products (all or by category) - بدون توثيق
productRouter.get("/api/products", async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const products = await Product.find(query);
    res.json(products);
  } catch (e) {
    handleError(res, e);
  }
});

// Get product by ID - بدون توثيق
productRouter.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // البحث عن المنتج باستخدام الـ ID
    const product = await Product.findById(id);

    // إذا لم يتم العثور على المنتج
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // إرجاع المنتج
    res.json(product);
  } catch (e) {
    handleError(res, e);
  }
});

// Search products by title
productRouter.get("/api/products/search/:title", auth, async (req, res) => {
  try {
    const products = await Product.find({
      title: { $regex: req.params.title, $options: "i" }, // Case-insensitive search
    });

    res.json(products);
  } catch (e) {
    handleError(res, e);
  }
});

// Rate a product
productRouter.post("/api/rate-product", auth, async (req, res) => {
  try {
    const { id, rating } = req.body;

    // Validate rating
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    let product = await Product.findById(id);

    // Remove existing rating by the same user
    product.ratings = product.ratings.filter(
      (rating) => rating.userId.toString() !== req.user
    );

    // Add new rating
    const ratingSchema = {
      userId: req.user,
      rating,
    };

    product.ratings.push(ratingSchema);
    product = await product.save();
    res.json(product);
  } catch (e) {
    handleError(res, e);
  }
});

// Get deal of the day (product with the highest average rating)
productRouter.get("/api/deal-of-day", auth, async (req, res) => {
  try {
    let products = await Product.find({});

    // Calculate average rating for each product
    products = products.map((product) => {
      const totalRatings = product.ratings.reduce(
        (sum, rating) => sum + rating.rating,
        0
      );
      const averageRating = totalRatings / product.ratings.length || 0;
      return { ...product.toObject(), averageRating };
    });

    // Sort products by average rating (descending)
    products.sort((a, b) => b.averageRating - a.averageRating);

    // Return the product with the highest average rating
    res.json(products[0]);
  } catch (e) {
    handleError(res, e);
  }
});

// Delete a product by ID
productRouter.delete("/api/delete-product/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the product exists
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete the product
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
  } catch (e) {
    handleError(res, e);
  }
});

module.exports = productRouter;