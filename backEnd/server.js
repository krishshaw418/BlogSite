const express = require ('express');
const app = express();
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const unLinkFile = util.promisify(fs.unlink);
const {BlogPost, AdminData} = require('./db');
const {uploadFile, getFile, deleteFile} = require('./s3');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config({path:`../.env`});
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const port = process.env.PORT;
const secret = process.env.SECRET_KEY;
app.use(cors());
app.use(express.json());
app.use(cookieParser());



//Api for image upload in the S3 bucket
app.post('/images', upload.single('image'), async(req, res) => {
    const file = req.file;
    const result = await uploadFile(file);
    await unLinkFile(file.path);
    res.json({ key: result.key });
});

//Api for posting blog content
app.post(`/post`, async(req,res)=>{
    const {heading, image, author, dateOfPublish, content} = req.body;
    const postId = uuidv4();
    try {
        const newBlogPost = new BlogPost({
            uid:postId,
            heading:heading,
            author:author,
            image:image,
            dateOfPublish:dateOfPublish,
            content:content
        });
        await newBlogPost.save();
        res.json({message:"Post Uploaded Successfully!"});
    } catch (error) {
        console.log(`Upload failed!`, error);
        res.json({message:"Upload Falied!"});
    }
});

//Api for getting all blogs
app.get(`/posts`, async(req,res)=>{
    try {
        const posts = await BlogPost.find();
        res.json(posts);
    } catch (error) {
        console.error("Error fetching the blog posts:", error);
        res.json({ error: "Failed to fetch the blog posts" });
    }
});

//Api for getting specific blog content
app.get(`/post/:uid`, async(req,res)=>{
    const {uid} = req.params;
    try {
        const post = await BlogPost.findOne({uid});
        if(!post){
            return res.json({message:"post not found!"});
        }
        //date formatting
        const d = new Date(post.dateOfPublish);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        
        res.json({post, dateOfPublish:`${day}-${month}-${year}`})
    } catch (error) {
        console.error("Error fetching the blog post:", error);
        res.json({ error: "Failed to fetch the blog post" });
    }
});

//Api for getting specific blog image
app.get(`/images/:key`, async(req,res)=>{
    const {key} = req.params;
    const result = await getFile(key);
    result.pipe(res);
});

//Api for deleting a blog post
app.delete(`/post/:key`, async(req,res)=>{
    const {key} = req.params;
    await deleteFile(key);
    await BlogPost.findOneAndDelete({image:key});
    res.json({message:"Post Deleted Successfully!"});
});

//Api for likes count of a blog
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

//Api for updating number of views of a blog
app.put(`/post/view/:uid`, async(req,res)=>{
    const {uid} = req.params;
    try {
        const post = await BlogPost.findOne({uid});
        if(!post){
            return res.json({message:"post not found!"});
        }
        await BlogPost.updateOne({uid},{$inc:{views:1}});
        return res.json({post});
    } catch (error) {
        return res.json({message:"Failed to update views!"});
    }
})

//Api for new admin singUp
app.post(`/signUp`, async(req, res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password)
        return res.json({message:"Please fill all the fields!"});

    const user = await AdminData.findOne({email});
    if(user)
        return res.json({message:"Admin already Exist! Please SignIn."});

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newAdmin = new AdminData({name:name,email:email,password:hashedPassword});
        await newAdmin.save();
        res.json({message:"Admin Created Successfully!"});
    }catch (error) {
        res.json({message:"Failed to create Admin!"}, error);
    }

})

//Api for Admin signIn
app.post('/signIn', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
  
    const user = await AdminData.findOne({email});
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials!' });
    }
  
    const token = jwt.sign({ id: user.id, email: user.email }, secret, {
      expiresIn: '1h',
    });
  
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });
  
    res.json({ message: 'Sign-in successful!' });
  });

app.listen(port,()=>{
    console.log(`Listening....`);
});