const mongoose = require("mongoose");

const Game = mongoose.model("Game");

const _addPublisher = function(req, res, game){
    game.publisher.name = req.body.name;
    //the body given by the API 
}

const getOne = function(req, res){
    console.log("getOne publisher Controller");

    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, game){
        console.log("Found publisher", game.publisher, " for Game ", game);
        res.status(200).json(game.publisher);
    });
}

const addOne = function(req, res){
    console.log("addOne publisher Controller");

    const gameId = req.params.gameId;
    Game.findById(gameId).select("publisher").exec(function(err, game){

       if(game){
           _addPublisher(req, res, game);
       }
    });
}

module.exports = {
    getOne: getOne
}