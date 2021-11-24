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
exports.Allsubcategories = async (req, res) => {
  console.log(req.params.id, "req.params.id");
  let classes = await connectDB.Subcategory.findAll({
    where: {},
    // include: [{ as: "lessons", model: connectDB.Lesson }],
  });
  res.send(classes);
};
exports.AllClasses = async (req, res) => {
  console.log(req.params.id, "req.params.id");
  let classes = await connectDB.Class.findAll({
    where: { subcategoryId: req.params.id },
    ///  attributes: ["id", "title", "description", "subcategoryId"],

    include: [
      {
        as: "lessons",
        model: connectDB.Lesson,
      },
    ],
  });

  res.send(classes);
};
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
exports.createClass = async (req, res) => {
  const { title, description, subcategoryId } = req.body;
  const subcategorydata = {
    title,
    subcategoryId,
    description,
  };
  const classes = await connectDB.Class.create(subcategorydata).catch((err) => {
    return res.send(err.errors);
  });

  res.send(classes);
};

exports.createlesson = async (req, res) => {
  const { title, description, classId, url } = req.body;
  const subcategorydata = {
    title,
    classId,
    description,
    url,
  };
  const lesson = await connectDB.Lesson.create(subcategorydata).catch((err) => {
    return res.send(err.errors);
  });

  res.send(lesson);
};

exports.getspecificlessons = async (req, res) => {
  console.log(req.params.id, "req.params.id");
  let lessons = await connectDB.Lesson.findAll({
    where: { classId: req.params.id },
    ///  attributes: ["id", "title", "description", "subcategoryId"],
  });

  res.send(lessons);
};
