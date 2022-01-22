require("./jobs-model");
const mongoose= require("mongoose");
mongoose.connect(process.env.DB_URL);
mongoose.connection.on("connected", function(){
    console.log("mongoose connected to", process.env.DB_NAME);})
mongoose.connection.on("err",function(err){
    console.log("mongoose connection error", err );
});
process.on("SIGINT", function(){
    mongoose.connection.close(function(){
        console.log(process.env.SIGINT_MESSAGE);
        process.exit(0);
    });
});

process.on("SIGTERM", function(){
    mongoose.connection.close(function(){
        console.log(process.env.SIGTERM_MESSAGE);
        process.exit(0);
    });
});
process.on("SIGUSR2", function(){
    mongoose.connection.close(function(){
        console.log(process.env.SIGUSR2_MESSAGE);
        process.exit(0);
    });
});