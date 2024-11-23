// src/routes/index.js
const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/SearchController');
const JWTMiddleware = require('../middlewares/JWTMiddleware');

router.get('/search', SearchController.search);

router.get('/search_images', SearchController.searchImages);

router.get('/search_tracks', SearchController.searchTracks);



module.exports = router;
