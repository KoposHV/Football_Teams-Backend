const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, trim: true },
      age: { type: Number, required: true },
      team: { type: String, required: false },
      quality: { type: Number, enum: [1, 2, 3, 4, 5] },
      position: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );
  
  const Player = mongoose.model("player", PlayerSchema);
  
  module.exports = Player;