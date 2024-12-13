const express = require ('express');
const app = express();
const port = 3000;
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.json());

const BlogPost = require('./db');

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

// app.get(`/post/likes/:uid`, async(req,res)=>{
//     const {uid} = req.params;
//     try {
//         const post = await BlogPost.findOne({uid});
//         if(!post){
//             return res.json({message:"post not found!"});
//         }

//         // const d = new Date(post.dateOfPublish);
//         // const day = String(d.getDate()).padStart(2, "0");
//         // const month = String(d.getMonth() + 1).padStart(2, "0");
//         // const year = d.getFullYear();
//         res.json(post.likes);
//     } catch (error) {
//         console.error("Error fetching the blog post:", error);
//         res.json({ error: "Failed to fetch the blog post" });
//     }
// })

// app.put(`/post/like/:uid`, async(req,res)=>{
//     const {uid} = req.params;
//     try {
//         const post = await BlogPost.findOneAndUpdate(
//             {uid},
//             { $inc: { likes: 1 } },
//             {new:true}
//         );
//         res.json({ likes: post.likes });   
//     } catch (error) {
//         console.log("Error:",error);
//         res.json({ error: "Failed to update likes" });
//     }
// })

app.put('/post/like/:uid', async (req, res) => {
    const { uid } = req.params;
    const { like } = req.body; // 'like' will be true to increment, false to decrement
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


// app.get(`/likes/:id`, async(req,res)=>{
//     try {
//         const post = await likes.findOne({ id: req.params.id });
//         if (!post) return res.status(404).json({ likes: 0 }); // Return 0 if the post doesn't exist
//         res.json({ likes: post.likes });
//       } catch (err) {
//         res.status(500).json({ error: "Failed to fetch likes" });
//       }
// })

// app.post("/liked/:id", async (req, res) => {
//     try {
//       const post = await likes.findOneAndUpdate(
//         { id: req.params.id },
//         { $inc: { likes: 1 } },
//         { new: true, upsert: true } // Create the document if it doesn't exist
//       );
//       res.json({ likes: post.likes });
//     } catch (err) {
//       res.status(500).json({ error: "Failed to update likes" });
//     }
//   });

app.listen(port,()=>{
    console.log(`Listening at port: ${port}`);
})