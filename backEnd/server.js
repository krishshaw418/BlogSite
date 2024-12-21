const express = require ('express');
const app = express();
const port = 3000;
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
app.use(cors());
app.use(express.json());
const BlogPost = require('./db');
require('dotenv').config({path:`../.env`});
const uri = process.env.MONGO_URI;

const storage = new GridFsStorage({
    url: uri,
    file: (req, file) => {
      return {
        filename: `${Date.now()}-${file.originalname}`,
        bucketName: 'Images',
      };
    },
  });

const upload = multer({ storage });

//Api for image upload in database
app.post('/images', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.json({message:'No file uploaded'});
    }
    res.json({
        fileId: req.file.id,
        filename: req.file.filename,
        message: 'File uploaded successfully!',
    });
  });

//Api for posting blog content
app.post(`/post`, async(req,res)=>{
    const {heading, author, dateOfPublish, image, content} = req.body;
    const postId = uuidv4();
    console.log(postId);
    try {
        const newBlogPost = new BlogPost({
            uid:postId,
            heading:heading,
            author:author,
            dateOfPublish:dateOfPublish,
            image:image,
            content:content
        });
        await newBlogPost.save();
        res.json({message:"Post Uploaded Successfully!"});
    } catch (error) {
        console.log(`Upload failed!`, error);
        res.json({message:"Upload Falied!"});
    }
})

//Api for getting all blogs

//Api for getiing specific blog content
app.get(`/post/:uid`, async(req,res)=>{
    const {uid} = req.params;
    try {
        const post = await BlogPost.findOne({uid});
        if(!post){
            return res.json({message:"post not found!"});
        }

        const d = new Date(post.dateOfPublish);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        res.json({post, dateOfPublish:`${day}-${month}-${year}`})
    } catch (error) {
        console.error("Error fetching the blog post:", error);
        res.json({ error: "Failed to fetch the blog post" });
    }
})

//Api for likes count
app.put('/post/like/:uid', async (req, res) => {
    const { uid } = req.params;
    const { like } = req.body;
    try {
        if (like === undefined) {
            return res.status(400).json({ error: "Like status (true/false) is required." });
        }

        const post = await BlogPost.findOneAndUpdate(
            { uid },
            { $inc: { likes: like ? 1 : -1 } },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        res.json({ likes: post.likes });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Failed to update likes" });
    }
});

app.listen(port,()=>{
    console.log(`Listening at port: ${port}`);
})