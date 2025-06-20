const express = require('express');
const postController = require('../controllers/post.controller');
const router = express.Router();

// Create a new Post
router.post('/', postController.create);

// Retrieve all Posts
router.get('/', postController.retrieveAllPosts);

// Retrieve a single Post by ID
router.get('/:id', postController.getPostById);

// Update a Post by ID
router.put('/:id', postController.updateById);

// Delete a Post by ID
router.delete('/:id', postController.deleteById);

module.exports = router;