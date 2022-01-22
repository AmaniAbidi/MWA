const express = require ("express");
const router = express.Router();
const JobsController = require("../controllers/jobsControllers");

router.route("/jobs")
       
       .post(JobsController.addOne)
       .get(JobsController.getAll)
       

router.route("/jobs/:jobId")
      .get(JobsController.getOne)
      .put(JobsController.fullUpdateOne)
      .patch(JobsController.partialUpdateOne)
      .delete(JobsController.deleteOne)












module.exports=router;