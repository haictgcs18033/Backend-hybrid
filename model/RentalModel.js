const mongoose = require("mongoose");
const rentalSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rental: [
      {
        propertyName: {
          type: String,
          unique: true,
          required: true,
        },
        property: {
          type: String,
          required: true,
        },
        rooms: {
          type: String,
          required: true,
        },
        rentPrice: {
          type: String,
          required: true,
        },
        furnitureType: {
          type: String,
        },
        reporterName: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          //   required: true,
        },
        note: [
          {
            description: {
              type: String,
              required: true,
            },
          },
        ],
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);
module.exports = mongoose.model("Rental", rentalSchema);
