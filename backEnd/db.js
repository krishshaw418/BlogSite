const mongoose = require('mongoose');
const Grid = require('gridfs-stream')
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
  author: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfPublish: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String, 
    required: true, 
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

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));
let gfs;
mongoose.connection.once('open', ()=>{
  gfs=Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('Images');
})
module.exports = BlogPost;