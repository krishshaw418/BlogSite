const mongoose = require('mongoose');
require('dotenv').config({path:`../.env`});
const uri = process.env.MONGO_URI;

const blogPostSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
  },
  heading: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfPublish: {
    type: Date,
    default: Date.now,
  },
  content: {
    type: String,
    required: true, 
  },
  likes: {
    type: Number,
    default: 0, 
    min: 0,
  },
  views: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

const AdminDataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  }
}) 

const AdminData = mongoose.model("AdminData", AdminDataSchema);

const VisitorsSchema = new mongoose.Schema({
  
})

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));
  
module.exports = {BlogPost, AdminData};