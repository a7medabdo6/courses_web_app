const express = require("express");
const connectDB = require("../models");

exports.AllCategories = async (req, res) => {
  let Categories = await connectDB.Category.findAll({
    where: {},
    include: [{ as: "subcategories", model: connectDB.Subcategory }],
  });

  res.send(Categories);
};

exports.CreateCategory = async (req, res) => {
  const { title, description } = req.body;
  const categorydata = {
    title,
    description,
  };
  const category = await connectDB.Category.create(categorydata).catch(
    (err) => {
      return res.send(err.errors);
    }
  );

  res.send(category);
};

/*========================================================================*/

exports.CreateSubcategory = async (req, res) => {
  const { title, description, categoryId } = req.body;
  const subcategorydata = {
    title,
    categoryId,
    description,
  };
  const subcategory = await connectDB.Subcategory.create(subcategorydata).catch(
    (err) => {
      return res.send(err.errors);
    }
  );

  res.send(subcategory);
};
