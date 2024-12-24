const express = require ('express');
const app = express();
const port = 3000;
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
app.use(cors());
app.use(express.json());
const BlogPost = require('./db');
const {uploadFile} = require('./s3');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config({path:`../.env`});
const uri = process.env.MONGO_URI;

//Api for image upload in AWS S3
app.post('/images', upload.single('image'), async(req, res) => {
    const file = req.file;
    const result = await uploadFile(file);
    // res.json({ imageUrl: result.Location });
});

//Api for posting blog content
app.post(`/post`, async(req,res)=>{
    const {heading, author, dateOfPublish, content} = req.body;
    const postId = uuidv4();
    // console.log(postId);
    try {
        const newBlogPost = new BlogPost({
            uid:postId,
            heading:heading,
            author:author,
            dateOfPublish:dateOfPublish,
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