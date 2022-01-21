const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    rating : Number,
    review: String,
    postDate: {
        type: Date,
        "default": Date.now
    }
});

const publisherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country: String,
    established: Number,
    location: {
        coordinates: {
            type: [Number],
            index: "2dsphere"
        }
    }

});

const gamesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year : Number,
    rate: Number,
    price: Number,
    minPlayers: {
        type: Number,
        min: 1,
        max: 10
    },
    maxPlayers: Number,
    minAge: Number,
    designers: [String],
    publisher: publisherSchema,
    reviews: [reviewSchema]
});


mongoose.model("Game", gamesSchema, "games");