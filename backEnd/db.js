const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.MONGO_URI;

const blogPostSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
  },
  heading: {
    type: String,
    required: true, // Heading is mandatory
    trim: true, // Removes whitespace around the string
  },
  author: {
    type: String,
    required: true, // Author is mandatory
    trim: true,
  },
  dateOfPublish: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String, // URL or file path of the image
    required: false, // Image is not mandatory
  },
  content: {
    type: String,
    required: true, // Blog content is mandatory
  },
  likes: {
    type: Number,
    default: 0, // Starts with 0 likes
    min: 0, // Prevent negative likes
  },
  views: {
    type: Number,
    default: 0, // Starts with 0 views
    min: 0, // Prevent negative views
  },
});

// Create the BlogPost model
const BlogPost = mongoose.model("BlogPost", blogPostSchema);

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

module.exports = BlogPost;