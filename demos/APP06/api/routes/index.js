const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gamesControllers");
const publisherController = require("../controllers/publisherController");
const reviewControllers = require("../controllers/reviewControllers");

router.route("/games")
    .get(gamesController.getAll)
    .post(gamesController.addOne);
router.route("/games/:gameId")
    .get(gamesController.getOne)
    .delete(gamesController.deleteOne)
    .put(gamesController.fullUpdateOne)
    .patch(gamesController.partialUpdateOne);

router.route("/games/:gameId/publisher")
    .get(publisherController.getOne);

router.route("/games/:gameId/reviews")
    .get(reviewControllers.getAll);

router.route("/games/:gameId/reviews/:reviewId")
    .get(reviewControllers.getOne);

module.exports=router;