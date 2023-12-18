const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/comments
router.get('/', (req, res) => {
    console.log('======================');
    Comment.findAll({
        attributes: ['id', 'comment_text', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ]
    })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Create a new post
// router.post('/', withAuth, async (req, res) => {
//     try {
//         const newComment = await Comment.create({
//             ...req.body,
//             user_id: req.session.user_id,
//         });

//         res.status(200).json(newComment);
//     } catch (err) {
//         console.error('Error occurred: ', err);
//         res.status(500).json(err);
//     }
// });

router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        content: req.body.content,
        postId: req.body.postId,
        userId: req.session.userId, // Assuming the user ID is stored in the session
      });
  
      const commentWithUser = await Comment.findByPk(newComment.id, {
        include: User, // Include the associated User
      });
  
      res.json(commentWithUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create comment' });
    }
  });

// Update a comment
router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentData[0]) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id!' });
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
