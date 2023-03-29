const express = require ('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const mongoose = require("mongoose")
const authController = require('./controllers/authController')
const productController = require('./controllers/productController')
const uploadController = require('./controllers/uploadController')

const app = express()
mongoose.set('strictQuery', false)
const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Connected to mongoDB.");
    } catch (error) {
      throw error;
    }
  };
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  app.use('/images', express.static('public/images'))
  app.use('/auth',authController)
  app.use('/product',productController)
  app.use('/upload',uploadController)

  app.listen(5000, () => {
    connect();
    console.log("Connected to backend.");
  });