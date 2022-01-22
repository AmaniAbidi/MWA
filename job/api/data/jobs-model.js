const mongoose = require ("mongoose");
const locationSchema = mongoose.Schema({
    state: String,
    zip: Number
});

const jobsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    salary: Number,
    description: String,
    experience: Number,
    skills: [String],
    postDate: Date

});
mongoose.model("Job", jobsSchema, "jobs");