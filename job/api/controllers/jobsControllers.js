
const { ObjectId } = require("mongodb");
const mongoose = require ("mongoose");
//const { fullUpdateOne, partialUpdateOne } = require("../../../APP06/api/controllers/JobControllers");
//const { report } = require("../routes");
//const { addOne } = require("../../../job/api/controllers/jobsControllers");
const Job = mongoose.model("Job");




const getAll = function(req, res){
    console.log(" get all jobs opening");
    console.log(req.query);
    Job.find().limit(parseInt(process.env.DEFAULT_FIND_LIMIT, 10)).exec(function(err, jobs){
        console.log("Found teams");
        res.status(200).json(jobs);
    })
}
//////////////////////////////////////////////

const getOne = function(req,res){
    const jobId=req.params.jobId;
    if(!mongoose.isValidObjectId(jobId)){
        console.log("Request param jobId is not a valid ID");
        res.status(400).json({ "message": "jobId must be valid ID"})
        return
    }

    Job.findById(jobId).exec(function(err, job){
        const response= {
            status: 200,
            message: job
        }

        if(err){
            console.log("Error founding job");
            response.status = 500
            response.message = err
        }
        else if(!job){
            console.log("job id not found");
            response.status = 404
            response.message = {"message" : "JobID not found"}
        }
        res.status(response.status).json(response.message)
    })
}

////////////////////////////////////////

 const addOne = function (req, res) {
    console.log("add called");

    const newJob = {
        title: req.body.title,
        salary : req.body.salary,
        description : req.body.description,
        experience : req.body.experience,
        skills: req.body.skills,
        postDate : req.body.postDate,
        location :{state:(req.body.state),
                  zip:parseFloat(req.body.zip)}
    }
    Job.create(newJob, function(err, job){
        const response={
            status:201,
            message:job
        };
        if(err){
            console.log("Error creating job");
            response.status=500;
            response.message=err;
        }
        res.status(response.status).json(response.message);
    })
}
/////////////////////////////////////////////
const _updateOne = function(req, res, updateJobCallback){
    console.log("update one job controller invoked");
    const jobId = req.params.jobId;

    if(!mongoose.isValidObjectId(jobId)){
        console.log("request param jobId is not a valid ID");
        res.status(400).json({"message": "JobId must be a valid ID"});
        return;
    };
    Job.findById(jobId).exec(function(err, job){
        const response = {
            status:200,
            message: job
        }
        if( err){
            console.log("Error finding job");
            response.status=500;
            response.message=err;
        }
        else if(!job){
            console.log("job is not found");
            response.status= 404;
            reponse.message={"message": "Job ID not found"};

        }
        console.log(response.status);
        if(response.status !==200){
            res.status(response.message).json(response.message);}
            else {
                updateJobCallback(req, res, job,response);
            }
        });}

   const _saveUpdateOne = function(res,job,response){
       job.save(function (err, updatedJob){
           if(err){
               response.status=500;
               response.message=err;
               console.log("in err of save");
           }
           console.log(response.message);
           res.status(response.status).json(response.message);
       });

   }

const _fulljobUpdate = function(req,res, job,response){
    job.title=req.body.title;
    job.salary=req.body.salary;
    job.description=req.body.description;
    job.experience=req.body.experience;
    job.skills=req.body.skills;
    job.postDate=req.body.postDate;
    job.location={zip: 0};
    _saveUpdateOne(res, job,response);
}
const _partialjobUpdate = function(req, res, job, response){
    if( req.body.title){
        job.title=req.body.title;
    }
    if(req.body.salary){
        job.salary=req.body.salary;
    }
    if(req.body.description){
        job.description=req.body.description;
    }
    if(req.body.skills){
        job.skills=req.body.skills;
    }
    if(req.body.postDate){
        job.postDate=req.body.postDate;
    }
    if(req.body.experience){
        req.experience=req.body.experience;
    }
    if(req.body.location){
        req.location=req.body.location;
    }
    _saveUpdateOne(res, job, response);

}
_saveOneJob= function(res, response, job){
    game.save(function(err, updatedJob){
        if(err){
            response.status=500
            reponse.message=err
        }
        else{
            response.message = updatedJob;
        }
        res.status(response.status).json(response.message)
    })
}

const deleteOne = function(req, res){
   const jobId = req.params.jobId;
   Job.findByIdAndDelete(jobId).exec(function(err,deletedJob){
       const response = {
           status : 204,
           message : deletedJob
       };
       if(err){
           console.log("Error finding game");
           response.status=500;
           response.message=err;
       }else if (!deletedJob){
           console.log("Job ID is not found");
           response.status=404;
           response.message= {
               "message":"Job ID not found" };
           }
           res.status(response.status).json(response.message);
       });
   }
fullUpdateOne=function(req, res){
    console.log("full update one game invoked");
    _updateOne(req,res,_fulljobUpdate);
}

partialUpdateOne = function(req,res){
    console.log("partial update one job invoked");
    _updateOne(req,res,_partialjobUpdate);
}
















module.exports={
  addOne,
  getOne,
  getAll, 
  fullUpdateOne,
  partialUpdateOne, 
  deleteOne
}