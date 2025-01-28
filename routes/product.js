// // const express = require("express");
// // const productRouter = express.Router();
// // const auth = require("../middlewares/auth");
// // const { Product } = require("../models/product");

// // productRouter.get("/api/products/", auth, async (req, res) => {
// //   try {
// //     const products = await Product.find({ category: req.query.category });
// //     res.json(products);
// //   } catch (e) {
// //     res.status(500).json({ error: e.message });
// //   }
// // });

// // const router = express.Router();

// // // Add a new product (protected route)
// // router.post("/api/add-product", auth, async (req, res) => {
// //   try {
// //     const { name, description, images, quantity, price, category } = req.body;

// //     let product = new Product({
// //       name,
// //       description,
// //       images,
// //       quantity,
// //       price,
// //       category,
// //     });

// //     product = await product.save();
// //     res.json(product);
// //   } catch (e) {
// //     res.status(500).json({ error: e.message });
// //   }
// // });

// // module.exports = router;

// // const express = require("express");
// // const { Product } = require("../models/product");
// // const auth = require("../middlewares/auth");
// // const router = express.Router();

// // // Get all products (protected route)
// // router.get("/api/products", auth, async (req, res) => {
// //   try {
// //     const products = await Product.find({});
// //     res.json(products);
// //   } catch (e) {
// //     res.status(500).json({ error: e.message });
// //   }
// // });

// // module.exports = router;


// // // create a get request to search products and get them
// // // /api/products/search/i
// // productRouter.get("/api/products/search/:name", auth, async (req, res) => {
// //   try {
// //     const products = await Product.find({
// //       name: { $regex: req.params.name, $options: "i" },
// //     });

// //     res.json(products);
// //   } catch (e) {
// //     res.status(500).json({ error: e.message });
// //   }
// // });

// // // create a post request route to rate the product.
// // productRouter.post("/api/rate-product", auth, async (req, res) => {
// //   try {
// //     const { id, rating } = req.body;
// //     let product = await Product.findById(id);

// //     for (let i = 0; i < product.ratings.length; i++) {
// //       if (product.ratings[i].userId == req.user) {
// //         product.ratings.splice(i, 1);
// //         break;
// //       }
// //     }

// //     const ratingSchema = {
// //       userId: req.user,
// //       rating,
// //     };

// //     product.ratings.push(ratingSchema);
// //     product = await product.save();
// //     res.json(product);
// //   } catch (e) {
// //     res.status(500).json({ error: e.message });
// //   }
// // });

// // productRouter.get("/api/deal-of-day", auth, async (req, res) => {
// //   try {
// //     let products = await Product.find({});

// //     products = products.sort((a, b) => {
// //       let aSum = 0;
// //       let bSum = 0;

// //       for (let i = 0; i < a.ratings.length; i++) {
// //         aSum += a.ratings[i].rating;
// //       }

// //       for (let i = 0; i < b.ratings.length; i++) {
// //         bSum += b.ratings[i].rating;
// //       }
// //       return aSum < bSum ? 1 : -1;
// //     });

// //     res.json(products[0]);
// //   } catch (e) {
// //     res.status(500).json({ error: e.message });
// //   }
// // });

// // module.exports = productRouter;

// const express = require("express");
// const productRouter = express.Router();
// const auth = require("../middlewares/auth");
// const { Product } = require("../models/product");

// // Get products by category
// productRouter.get("/api/products/", auth, async (req, res) => {
//   try {
//     const products = await Product.find({ category: req.query.category });
//     res.json(products);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// // Add a new product
// productRouter.post("/api/add-product", auth, async (req, res) => {
//   try {
//     const { name, description, images, quantity, price, category } = req.body;

//     let product = new Product({
//       name,
//       description,
//       images,
//       quantity,
//       price,
//       category,
//     });

//     product = await product.save();
//     res.json(product);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// // Get all products
// productRouter.get("/api/products", auth, async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.json(products);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// // Search products by name
// productRouter.get("/api/products/search/:name", auth, async (req, res) => {
//   try {
//     const products = await Product.find({
//       name: { $regex: req.params.name, $options: "i" },
//     });

//     res.json(products);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// // Rate a product
// productRouter.post("/api/rate-product", auth, async (req, res) => {
//   try {
//     const { id, rating } = req.body;
//     let product = await Product.findById(id);

//     for (let i = 0; i < product.ratings.length; i++) {
//       if (product.ratings[i].userId == req.user) {
//         product.ratings.splice(i, 1);
//         break;
//       }
//     }

//     const ratingSchema = {
//       userId: req.user,
//       rating,
//     };

//     product.ratings.push(ratingSchema);
//     product = await product.save();
//     res.json(product);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// // Get deal of the day
// productRouter.get("/api/deal-of-day", auth, async (req, res) => {
//   try {
//     let products = await Product.find({});

//     products = products.sort((a, b) => {
//       let aSum = 0;
//       let bSum = 0;

//       for (let i = 0; i < a.ratings.length; i++) {
//         aSum += a.ratings[i].rating;
//       }

//       for (let i = 0; i < b.ratings.length; i++) {
//         bSum += b.ratings[i].rating;
//       }
//       return aSum < bSum ? 1 : -1;
//     });

//     res.json(products[0]);
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// module.exports = productRouter;
// ============================== 
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

// Search products by name
productRouter.get("/api/products/search/:name", auth, async (req, res) => {
  try {
    const products = await Product.find({
      name: { $regex: req.params.name, $options: "i" }, // Case-insensitive search
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