const mongoose = require("mongoose");
const Game = mongoose.model("Game");

const _updateOne = function(req,res,updateGameCallback){
    console.log("update one game controller invoked");
    const gameId = req.params.gameId;

    if(!mongoose.isValidObjectId(gameId)){
        console.log("request param gameId is not a valid ID");
        res.status(400).json({"message": "GameId must be a valid ID"});
        return;
    };

    Game.findById(gameId).exec(function(err,game){
        const response={
            status:200,
            message: game
        }
        if(err){
            console.log("Error finding game");
            response.status=500;
            response.message=err;
        }else if(!game){
            console.log("Game id not found");
            response.status=404;
            response.message={"message": "Game ID not found"};
        } 
        if(response.status !==200){
            res.status(response.status).json(response.message);
        } else{
            updateGameCallback(req,res,game,response);
        }
    });
}

const _saveUpdateOne = function(res,game,response){
    game.save(function(err,updatedGame){
        if(err){
            response.status=500;
            response.message=err;
            console.log("in err of save");
        } 
            console.log(response.message);
            res.status(response.status).json(response.message);
    });
}

const _fullgameUpdate = function(req,res,game,response){
    game.title=req.body.title;
    game.year= req.body.year;
    game.rate= req.body.rate;
    game.price=req.body.price;
    game.maxPlayers=req.body.maxPlayers;
    game.minPlayers=req.body.minPlayers;
    game.minAge=req.body.minAge;
    game.designers= req.body.designers;
    if(req.body.name){
        console.log("Name passed");
        game.publisher={name:req.body.name};
    } else{
        game.publisher={name: "NoName"}
    }
    game.reviews= [];
    _saveUpdateOne(res,game,response);
}
 
const _partialgameUpdate = function(req,res,game,response){
    console.log("here");
    if (req.body.title){
        game.title=req.body.title;
    }
    if(req.body.year){
        game.year= req.body.year;
    }
    if(req.body.rate){
        game.rate= req.body.rate;
    }
    if(req.body.price){
        game.price=req.body.price;
    }
    if(req.body.maxPlayers){
        game.maxPlayers=req.body.maxPlayers;
    }
    if(req.body.minPlayers){
        game.minPlayers=req.body.minPlayers;
    }
    if(req.body.minAge){
        game.minAge=req.body.minAge;
    }
    if(req.body.designers){
        game.designers= req.body.designers;
    }  
    _saveUpdateOne(res,game,response);
}
const _runGeoQuery= function(req,res){
    const lng=parseFloat(req.query.lng);
    const lat=parseFloat(req.query.lat);
    let distance = parseFloat(process.env.GEO_SEARCH_MAX_DIST,10);

    if(req.query.dist){
        if(isNaN(req.query.dist)){
            res.status(400).json({"message":"distance must be a number"});
            return;
        }
        distance=req.query.dist;
    }
    const point = {
        type:"Point",
        coordinates: [lng,lat]
    };

    const query = {
        "publisher.location.coordinates":{
            $near: {
                $geometry: point,
                $maxDistance: distance,
                $minDistance: parseFloat(process.env.GEO_SEARCH_MIN_DIST,10)
            }
        }
    };

    Game.find(query).exec(function(err,games){
        if(err){
            res.status(500).json(err);
            console.log(err);
        }
        else{
            res.status(200).json(games);
            console.log("Found Games!");
        }
    });
}
module.exports.getAll = function(req,res){
    console.log("Controller GetAll invoked");

    if(req.query && req.query.lat && req.query.lng){
        if(isNaN(req.query.lat)|| isNaN(req.query.lng)){
            res.status(400).json({"message":"lat and lng are not numbers"});
            return;
        }
        _runGeoQuery(req,res);
        return;
    }
    console.log("heree");
    let offset =process.env.DEFAULT_FIND_OFFSET;
    let count =9;
    const maxCount = parseInt(process.env.DEFAULT_MAX_FIND_LIMIT);
    console.log(req.query);
    if(req.query && req.query.offset && req.query.count){
        if (req.query && req.query.offset){
            offset = parseInt(req.query.offset,10);
        }
        if(req.query && req.query.count){
            count = parseInt(req.query.count,10);
        }
    
        if (isNaN(offset)||isNaN(count)){
            console.log("offset or count are not numbers");
            res.status(400).json({"message":"QueryString offset and count should be digits."});
            return;
        }
    
        if(count>maxCount){
            res.status(400).json({"message":"Cannot exceed count of "+maxCount});
            return;
        }
    }


    Game.find().skip(offset).limit(count).exec(function(err, games){
        if(err){
            console.log("Error finding games");
            res.status(500).json(err)
        } else{
            console.log("Found games");
            res.status(200).json(games);
        }
    });
}

module.exports.getOne = function(req,res){
    console.log("Controller GetOne invoked"); 
    const gameId = req.params.gameId;

    if(!mongoose.isValidObjectId(gameId)){
        console.log("request param gameId is not a valid ID");
        res.status(400).json({"message": "GameId must be a valid ID"});
        return;
    }
    Game.findById(gameId).exec(function(err,game){
        const response={
            status:200,
            message: game
        }
        if(err){
            console.log("Error finding game");
            response.status=500;
            response.message=err;
        }else if(!game){
            console.log("Game id not found");
            response.status=404;
            response.message={"message": "Game ID not found"};
        } 
        res.status(response.status).json(response.message);
    });
}

module.exports.addOne = function(req,res){
    console.log("Controller addOne invoked");

    const newGame = {
        title: req.body.title,
        year: req.body.year,
        rate:req.body.rate,
        price:req.body.price,
        minPlayers:req.body.minPlayers,
        maxPlayers:req.body.maxPlayers,
        publisher:{
            name: "NoName"
        },
        reviews:[],
        minAge:req.body.minAge,
        designers: [req.body.designers]
    }
    Game.create(newGame, function(err,game){
        const response={
            status:201,
            message:game
        };
        if(err){
            console.log("Error creating game");
            response.status=500;
            response.message=err;
        }
        res.status(response.status).json(response.message);
    });

}

module.exports.deleteOne= function (req, res) {
    const gameId= req.params.gameId;
    Game.findByIdAndDelete(gameId).exec(function (err, deletedGame) {
        const response = {
            status: 204,
            message: deletedGame
        };
        if (err) {
            console.log("Error finding game");
            response.status= 500;
            response.message= err;
        } else if (!deletedGame) {
            console.log("Game id not found");
            response.status= 404;
            response.message= {
                "message": "Game ID not found"};
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.fullUpdateOne = function(req,res){
    console.log("full update one game invoked");
    _updateOne(req,res,_fullgameUpdate);     
}

module.exports.partialUpdateOne = function(req,res){
    console.log("partial update one game invoked");
    _updateOne(req,res,_partialgameUpdate);
}
