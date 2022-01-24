const express = require("express")

const router = express.Router()
const teamsController = require("../controllers/teams.controllers")
const playersController = require("../controllers/players.controllers")

router.route("/teams")
     .get(teamsController.getAll)
     .post(teamsController.addOne)     

router.route("/teams/:teamId")
     .get(teamsController.getOne)
     .delete(teamsController.deleteOne)
     .put(teamsController.FullUpdateOne)

router.route("/teams/:teamId/players")
      .get(playersController.getAll)
      .post(playersController.addOne)

router.route("/teams/:teamId/players/:playerId")
      .get(playersController.getOne)
      .delete(playersController.deleteOne)
      .put(playersController.fullUpdate)

     

module.exports = router