const mongoose = require("mongoose")

const playerSchema = mongoose.Schema({
    name: {
        type: String,
        //required: true
    },
    
    age : {
        type: Number,
       // min: 1,
        //max: 2,
        //"default": 1
    },
})

const teamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    year: Number,
    rate: {
        type: Number,
        min: 1,
        max: 5,
        "default": 1
    },
    coachName: {
        type: String,
        required: true
    },
    
    players: [playerSchema],
    
})


mongoose.model(process.env.DB_TEAM_MODEL, teamSchema, "teams")