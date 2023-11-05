const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, trim: true },
      shield: { type: String, required: true },
      country: { type: String, required: false },
      quality: { type: Number, enum: [1, 2, 3, 4, 5] },
      partners: {type: Number, required: true },
      year: { type: Number, required: true },
    },
    {
      timestamps: true,
    }
  );
  
  const Team = mongoose.model("team", TeamSchema);
  
  module.exports = Team;