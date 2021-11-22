const express = require("express");
const router = express.Router();
const {
  AllCategories,
  CreateCategory,
  CreateSubcategory,
} = require("../controllers/CategoryController");

router.get("/api/categories", AllCategories);
router.post("/api/category/create", CreateCategory);

router.post("/api/subcategory/create", CreateSubcategory);

module.exports = router;
