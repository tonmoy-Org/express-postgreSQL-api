/**
 * Copyright by https://loizenai.com
 * youtube loizenai
 */

const db = require('../config/db.config.js');
const Post = db.Post;

exports.create = (req, res) => {
    let post = {};

    try {
        // Building Post object from uploading request's body
        post.title = req.body.title;
        post.content = req.body.content;
        post.image = req.body.image;

        // Save to MySQL database
        Post.create(post).then(result => {
            // send uploading message to client
            res.status(200).json({
                message: "Upload Successfully a Post with id = " + result.id,
                post: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllPosts = (req, res) => {
    // find all Post information from 
    Post.findAll()
        .then(postInfos => {
            res.status(200).json({
                message: "Get all Posts' Infos Successfully!",
                posts: postInfos
            });
        })
        .catch(error => {
            // log on console
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getPostById = (req, res) => {
    let postId = req.params.id;
    Post.findByPk(postId)
        .then(post => {
            res.status(200).json({
                message: "Successfully Get a Post with id = " + postId,
                posts: post
            });
        })
        .catch(error => {
            // log on console
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let postId = req.params.id;
        let post = await Post.findByPk(postId);

        if (!post) {
            // return a response to client
            res.status(404).json({
                message: "Not Found for updating a post with id = " + postId,
                post: "",
                error: "404"
            });
        } else {
            // update new change to database
            let updatedObject = {
                title: req.body.title,
                content: req.body.content,
                image: req.body.image
            }
            let result = await Post.update(updatedObject, { returning: true, where: { id: postId } });

            // return the response to client
            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a post with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Post with id = " + postId,
                post: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a post with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let postId = req.params.id;
        let post = await Post.findByPk(postId);

        if (!post) {
            res.status(404).json({
                message: "Does Not exist a Post with id = " + postId,
                error: "404",
            });
        } else {
            await post.destroy();
            res.status(200).json({
                message: "Delete Successfully a Post with id = " + postId,
                post: post,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a post with id = " + req.params.id,
            error: error.message,
        });
    }
}