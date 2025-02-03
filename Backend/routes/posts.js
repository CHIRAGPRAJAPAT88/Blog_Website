// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const User = require("../models/User.js");
// const Post = require("../models/Post.js");
// const Comments = require("../models/Comments.js");
// const verifyToken = require("../verifyToken.js");


// // Create a new post

// router.post("/", verifyToken, async (req, res) => {
//     try {
//         const newPost = new Post(req.body)
//         const savedpost = await newPost.save()
//         res.status(200).json(savedpost);
//     } 
//     catch (err) {
//         res.status(500).json(err);
//     }
// });


// // Update a post

// router.put("/:id", verifyToken, async (req, res) => {
//     try {
//         const updatepost = await Post.findByIdAndUpdate(
//             req.params.id,
//             {
//                 $set: req.body,
//             },
//             { new: true }
//         );
//         res.status(200).json(updatepost);
//     } catch (err) {
//         res.status(500).json(err);
//     }

// });

// // Delete a post 

// router.delete("/:id", verifyToken, async (req, res) => {
//     try {
//         await Post.findByIdAndDelete(req.params.id);
//         await Comments.deleteMany({ PostId: req.params.id });
//         res.status(200).json("Post has been deleted...");
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

// // Get a post Details

// router.get("/:id", async (req, res) => {
//     try {
//         const post = await Post.findByIdAnd(req.params.id);
//         res.status(200).json(post);
//     }
//     catch (err) {
//         res.status(500).json(err);
//     }
// })

// // get post 

// router.get("/", async (req, res) => {
//     try {
//         const searchFilter = {
//             title: { $regex: express.query.search, $options: "i" },
//         }
//         const posts = await Post.find(express.query.search ? searchFilter : null);
//         res.status(200).json(posts);
//     }
//     catch (err) {
//         res.status(500).json(err);
//     }
// })

// // get user posts
// router.get("/user/:userid", async (req, res) => {
//     try {
//         const posts = await Post.find({ userId: req.params.userid });
//         res.status(200).json(posts);
//     }
//     catch (err) {
//         res.status(500).json(err);
//     }
// })


// module.exports = router

const express=require('express')
const router=express.Router()
const User=require('../models/User')
const bcrypt=require('bcrypt')
const Post=require('../models/Post')
const Comment=require('../models/Comment')
const verifyToken = require('../verifyToken')

//CREATE
router.post("/create",async (req,res)=>{
    try{
        const newPost=new Post(req.body)
        // console.log(req.body)
        const savedPost=await newPost.save()
        
        res.status(200).json(savedPost)
    }
    catch(err){
        
        res.status(500).json(err)
    }
     
})

//UPDATE
router.put("/:id",verifyToken,async (req,res)=>{
    try{
       
        const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updatedPost)

    }
    catch(err){
        res.status(500).json(err)
    }
})


//DELETE
router.delete("/:id",verifyToken,async (req,res)=>{
    try{
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json("Post has been deleted!")

    }
    catch(err){
        res.status(500).json(err)
    }
})


//GET POST DETAILS
router.get("/:id",async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//GET POSTS
router.get("/",async (req,res)=>{
    const query=req.query
    
    try{
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        const posts=await Post.find(query.search?searchFilter:null)
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//GET USER POSTS
router.get("/user/:userId",async (req,res)=>{
    try{
        const posts=await Post.find({userId:req.params.userId})
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})



module.exports=router