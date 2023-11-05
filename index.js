const express = require("express");
const dotenv = require("dotenv");
const connect = require("./utils/db");
const Team = require("./models/team.model");
const Player = require("./models/player.model");

const server = express();
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

connect();

const router = express.Router();
//Routes
router.get("/players", async (req, res) => {
  try {
    const players = await Player.find();
    return res.status(200).json(players);
  } catch (error) {
    return res.status(400).json("Players not found");
  }
});
//GET player BY ID
router.get("/players/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const player = await Player.findById(id);
    return res.status(200).json(player);
  } catch (error) {
    return res.status(404).json("Player not found");
  }
});
  router.get("/teams", async (req, res) => {
    try {
      const teams = await Team.find();
      return res.status(200).json(teams);
    } catch (error) {
      return res.status(400).json("Teams not found");
    }
  });
  //GET team BY ID
  router.get("/teams/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const team = await Team.findById(id);
      return res.status(200).json(team);
    } catch (error) {
      return res.status(404).json("Team not found");
    }
  });
  //POST
  router.post("/players", async (req, res) => {
    try {
      const newPlayer = new Player(req.body);
      await newPlayer.save();
      return res.status(201).json(newPlayer);
    } catch (error) {
      return res.status(500).json("Failed creating player", error);
    }
  });
  
  router.post("/teams", async (req, res) => {
    try {
      const newTeam = new Team(req.body);
      await newTeam.save();
      return res.status(201).json(newTeam);
    } catch (error) {
      return res.status(500).json("Failed creating team", error);
    }
  });
//DELETE
router.delete("/players/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Player.findByIdAndDelete(id);
    return res.status(200).json("Player deleted");
  } catch (error) {
    return res.status(500).json("Error deleting player");
  }
});
router.delete("/teams/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Team.findByIdAndDelete(id);
    return res.status(200).json("Team deleted");
  } catch (error) {
    return res.status(500).json("Error deleting team");
  }
});
//UPDATE
router.patch("/players/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newPlayer = new Player(req.body);
    newPlayer._id = id;
    await Player.findByIdAndUpdate(id, newPlayer);
    return res.status(200).json(newPlayer)
  } catch (error) {
    return res.status(500).json("Error updating player")
  }
});
router.patch("/teams/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newTeam = new Team(req.body);
    newTeam._id = id;
    await Team.findByIdAndUpdate(id, newTeam);
    return res.status(200).json(newTeam)
  } catch (error) {
    return res.status(500).json("Error updating team")
  }
});
//FIND BY NAME
router.get("/Nacho", async (req, res) => {
  try {
    const player = await Player.findOne({ name: "Nacho" }).populate(
      "players"
    );
    return res.status(200).json(player);
  } catch (error) {
    return res.status(404).json("Player not found", error);
  }
});
//FIND BY NAME QUERY
router.get("/search/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const player = await Player.findOne({ name: name }).populate("teams");
    return res.status(200).json(player);
  } catch (error) {
    return res.status(404).json("Player not found", error);
  }
});
//MAS DE 20
router.get("/teams/optimum", async (req, res) => {
  try {
    const teams = await Team.find({ quantity: { $gt: 20 } });
    return res.status(200).json(teams);
  } catch (error) {
    return res.status(404).json("teams not found");
  }
});
//ORDENADO POR CALIDAD
router.get("/Players/ordered", async (req, res) => {
  try {
    const Players = await Player.find().sort({ quality: -1 });
    return res.status(200).json(Players);
  } catch (error) {
    return res.status(404).json("players not found");
  }
});



server.use("/", router);

const PORT = process.env.PORT;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });