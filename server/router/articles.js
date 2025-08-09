const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { articleController } = require('../controllers');


// middleware that is specific to this router

router.get('/', articleController.getAll);
router.post('/', auth(), articleController.createArticle);
router.get('/:articleId', articleController.getArticle);
router.put('/:articleId/like', auth(), articleController.likeArticle);
router.put('/:articleId/edit', auth(), articleController.editArticle);
router.delete('/:articleId/delete', auth(), articleController.deleteArticle);

// router.get('/my-trips/:id/reservations', auth(), themeController.getReservations);

module.exports = router