const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../model/product");

// get all data
router.get("/", (req, res, next) => {
  // const pageSize=10;
  // const page=2;
  // accessing query string
  const pageSize = req.query.pageSize;
  const page = req.query.page
  Product.find({}).limit(pageSize).skip(pageSize * page)
    .then((result) => {
      res.status(200).json({ productData: result });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// get by id data
router.get("/:id", (req, res, next) => {
  Product.findById(req.params.id)
    .then((result) => {
      res.status(200).json({ productData: result });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// add data by post methods
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    productId: req.body.productId,
    productName: req.body.name,
    categoryName: req.body.categoryName,
    categoryId: req.body.categoryId,
    phone: req.body.phone,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        newProduct: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// delete data by id
router.delete("/:id", (req, res, next) => {
  Product.remove({ _id: req.params.id })
    .then((result) => {
      res.status(200).json({
        message: "successfully deleted",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// find one and update
router.put("/:id", (req, res, next) => {
  console.log(req.params.id);
  Product.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        productId: req.body.productId,
        productName: req.body.name,
        categoryName: req.body.categoryName,
        categoryId: req.body.categoryId,
        phone: req.body.phone,
      },
    }
  )
    .then((result) => {
      res.status(200).json({ message: "successfully updated", result: result });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
