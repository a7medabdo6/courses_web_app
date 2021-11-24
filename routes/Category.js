const express = require("express");
const router = express.Router();
const {
  AllCategories,
  CreateCategory,
  CreateSubcategory,
  AllClasses,
  Allsubcategories,
  createClass,
  createlesson,
  getspecificlessons,
} = require("../controllers/CategoryController");

router.get("/api/categories", AllCategories);
router.post("/api/category/create", CreateCategory);

router.post("/api/subcategory/create", CreateSubcategory);
router.get("/api/subcategory", Allsubcategories);

router.post("/api/class/create", createClass);

router.get("/api/classes/:id", AllClasses);

router.post("/api/lesson/create", createlesson);
router.get("/api/lessons/:id", getspecificlessons);

module.exports = router;
