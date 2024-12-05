// src/routes/index.js
const express = require('express');
const router = express.Router();
const SearchController = require('../controllers/SearchController');
const UsersController = require('../controllers/UserController');
const JWTMiddleware = require('../middlewares/JWTMiddleware');

router.get('/search', SearchController.search);

router.get('/search_images', SearchController.searchImages);

router.get('/search_tracks', SearchController.searchTracks);

router.get("/users", UsersController.GetUsers);

router.post("/register", UsersController.Register);

router.get("/login", UsersController.Login);


module.exports = router;
