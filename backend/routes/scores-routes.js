//'places' route
const express = require('express');

const scoresController = require('../controllers/scores-controller');

const router = express.Router();

const { check } = require('express-validator');



// ===== ===== ROUTES ===== =====
//DON'T FORGET THAT ROUTE ORDER MATTERS!!

//router.use/get/post.get('path', (req, res, next) => {})
router.get('/:sid', scoresController.getScoreById);

// '/api/scores/user/:uid
router.get('/user/:uid', scoresController.getScoresByUserId);

//POST AND PATCH require validation!! YOu can register MULTIPLE middlewares on your http path, from left to right!!
router.post('/', [check('title').not().isEmpty(), check('description').isLength({min: 5}), check('score').not().isEmpty()], scoresController.createScore);
//THis works because it is a different kind of route
router.patch('/:sid', [check('title').not().isEmpty(), check('description').isLength({min: 5})], scoresController.updateScore)

router.delete('/:sid', scoresController.deleteScore)
// ===== ===== ====== ===== =====


module.exports = router;