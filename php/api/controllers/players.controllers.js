const mongoose = require("mongoose")
const { ObjectId } = require("bson");
const Team = mongoose.model(process.env.DB_TEAM_MODEL)


const getAll = function(req, res) {
    console.log("getAll  Controller");
    const teamId = req.params.teamId
    Team.findById(teamId).select("players").exec(function(err, team) {
        console.log("Found players", team, " for Team", team);
        res.status(200).json(team)
    })
}

const addOne = function(req, res){
    console.log("player Controller addOne invoked");
    const teamId = req.params.teamId;

    if(!ObjectId.isValid(teamId)){
        console.log("teamId: ", teamId, " invalid");
        res.status(400).json({"message": "teamId is invalid"});
        return;
    }
    const newPlayer = {
        name: req.body.name,
        age: req.body.age
    }
    console.log(teamId);
    Team.findOneAndUpdate({_id: teamId}, {$push: {players : newPlayer}}, function(err, team){
        const response = {
            status : 201,
            message : team.player
        }
        if(err){
            console.log(err);
            response.status = 500;
            response.message = err;
        }else{
            console.log(team);
        }
        res.status(response.status).json(response.message);
    });
}

const getOne = function(req, res) {
    console.log("getOne player Controller");
    const teamId = req.params.teamId
    const playerId=req.params.playerId
    Team.findById(teamId).select("players").exec(function(err, team) {
        console.log("Found players", team.players, " for team", team);
        res.status(200).json(team.players.id(playerId))
    })
}

 
const deleteOne = function(req, res){
    console.log("player Controller deleteOne invoked");
    const teamId = req.params.teamId;
    const playerId = req.params.playerId
    if(!ObjectId.isValid(teamId) || !ObjectId.isValid(playerId)){
        console.log("teamId: ", teamId, " invalid");
        res.status(400).json({"message": "teamId || playerId is invalid"});
        return;
    }

    Team.findOneAndUpdate({_id: teamId}, {$pull: {players: {_id : playerId}}}, function(err, team){
        const response = {
            status: 201,
            message : team
        }
        if(err){
            console.log(err);
            response.status = 500;
            response.message = err
        }else if(!team){
            console.log("team not found");
            response.status = 404;
            response.message = {"message" : "team || player not found"};
        }else{
            console.log("team model deleted");
        }
        res.status(response.status).json(response.message);
    });
}
const fullUpdate = function(req, res){
    console.log(" Controller fullUpdate invoked");
    let _id = process.env.TEAM_ID;
    const teamId = req.params.teamId;
    const playerId = req.params.playerId;
    const fullteamUpdate = {
        _id: req.params.teamId,
        name: req.body.name,

    }
    Team.updateOne({
        _id : teamId,
        "players._id" : playerId
    },{
        "$set" : {
            "players.$.name" : req.body.name,
            "players.$.age" : req.body.age
        }
    }, function(err, team){
        console.log(team);
        const response = {
            status : 201,
            message : team
        }
        if(err){
            console.log(err);
            response.status = 500;
            response.message = err
        }else if(!team || !team){
            console.log("Not found");
            response.status = 404;
            response.message = {"message" : "team || player Id not found"}
        }else{
            console.log("team found");
        }
        res.status(response.status).json(response.message);
    });
}

module.exports = {
    getOne,
    addOne,
    getAll,
    deleteOne,
    fullUpdate
}