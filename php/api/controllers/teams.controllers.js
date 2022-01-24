const mongoose = require("mongoose")
const ObjectId = require("mongodb").ObjectId;

const Team = mongoose.model(process.env.DB_TEAM_MODEL)


   
   // Team.find(query).limit(parseInt(process.env.DEFAULT_FIND_LIMIT, 10)).exec(function(err, teams) {
    //    console.log("Found teams");
     //   res.status(200).json(teams)
    //})


const getAll = function(req, res) {
    console.log("GET all teams");
    console.log(req.query);
    Team.find().limit(parseInt(process.env.DEFAULT_FIND_LIMIT, 10)).exec(function(err, teams) {
           console.log("Found teams");
           res.status(200).json(teams);
    })

}

    

const getOne = function(req, res) {
    const teamId = req.params.teamId

    // console.log("gameId valid", ObjectId.isValid(gameId));
    if (!mongoose.isValidObjectId(teamId)) {
        console.log("Request param teamId is not a valid ID");
        res.status(400).json({"message": "teamId must be a valid ID"})
        return
    }

    Team.findById(teamId).exec(function(err, team){
        const response = {
            status: 200,
            message: team
        }
        if (err) {
            console.log("Error founding team");
            response.status = 500
            response.message = err
        } else if (!team) { // game === null
            console.log("Team id not team");
            response.status = 404
            response.message = {"message": "TeamID not found"}
        }
        res.status(response.status).json(response.message)
    })
}

const addOne = function(req, res) {
    console.log("Controller addOne invoked");
    console.log(req.body);

    const newTeam = {
        name: req.body.name,
        year: req.body.year,
        coachName: req.body.coachName,
        players: []
    }

    Team.create(newTeam, function (err, team) {
        const response = {
            status: 201,
            message: team
        }
        if (err) {
            console.log("Error creating new team", err);
            response.status = 500
            response.message = err
        }
        res.status(response.status).json(response.message)
    })
}
const deleteOne = function(req, res){
    console.log("Team Controller deleteOne invoked");
    const teamId = req.params.teamId;
    const playerId = req.params.playerId
    if(!ObjectId.isValid(teamId) ){
        console.log("teamId: ", teamId, " invalid");
        return res.status(400).json({"message": "teamId || playerId is invalid"});
    }

    Team.deleteOne({"_id": teamId}).exec( function (err, team) {
        const response = {
            status: 201,
            message: "deleted"
        }
        if (err) {
            console.log("Error deleting team", err);
            response.status = 500
            response.message = err
        }
        res.status(response.status).json(response.message)
    })


}
   
const FullUpdateOne = function(req, res) {
    console.log("Controller addOne invoked");
    console.log(req.body);
    const teamId=req.params.teamId;

    const newTeam = {
        name: req.body.name,
        year: req.body.year,
        coachName: req.body.coachName,
        players: []
    }

    Team.updateOne({"_id": teamId},newTeam).exec( function (err, team) {
        const response = {
            status: 201,
            message: team
        }
        if (err) {
            console.log("Error creating new team", err);
            response.status = 500
            response.message = err
        }
        res.status(response.status).json(response.message)
    })
}

module.exports = {
    getAll,
    getOne,
    addOne,
    deleteOne,
    FullUpdateOne
}
