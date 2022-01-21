const mongoose = require("mongoose");

const Game = mongoose.model("Game");


const getAll = function(req, res){
    console.log("getAll review Controller");

    const gameId = req.params.gameId;
    Game.findById(gameId).select("reviews").exec(function(err, game){
        console.log("Found publisher", game.publisher, " for Game ", game);
        res.status(200).json(game.reviews);
    });
}

const getOne = function(req, res){
    console.log("getOne review Controller");

    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    Game.findById(gameId).select("reviews").exec(function(err, game){
        console.log("Found publisher", game.publisher, " for Game ", game);
        res.status(200).json(game.reviews.id(reviewId));
    });
}

module.exports = {
    getAll: getAll,
    getOne: getOne
}