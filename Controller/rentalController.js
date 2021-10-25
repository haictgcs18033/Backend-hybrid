const mongoose = require("mongoose");
const Rental = require("../model/RentalModel");
exports.getRental = (req, res) => {
  if (req.user.userId) {
    Rental.find({ user: req.user.userId }).exec((err, rental) => {
      if (err) return res.status(404).json({ message: "err" });
      if (rental.length === 0) res.status(400).json({ message: "No item" });
      if (rental.length > 0) {
        return res.status(200).json(rental);
      }
    });
  } else {
    res.status(400).json({ message: "Error" });
  }
};
exports.addRental = (req, res) => {
  const { propertyName, property, rent, room, reporter } = req.body;

  const imageUrl = req.file.filename;
  let value = {
    propertyName: propertyName,
    property: property,
    rooms: room,
    rentPrice: rent,
    reporterName: reporter,
    image: imageUrl,
  };

  Rental.updateOne(
    { user: req.user.userId },
    {
      $push: {
        rental: value,
      },
    },
    { upsert: true }
  ).exec((err, rental) => {
    if (err) return res.status(400).json({ message: err });
    if (rental) {
      return res.status(200).json({ rental });
    }
  });
};
exports.getRentalDetail = async (req, res) => {
  const { id } = req.params;
  Rental.find({ user: req.user.userId })
    .lean()
    .exec((err, rental) => {
      err ? res.status(400).json({ err }) : null;
      if (rental) {
        let result = rental[0].rental.find(
          (rental) => rental._id.toString() === id
        );
        return res.status(200).json(result);
      }
    });
};
exports.updateRental = (req, res) => {
  const { id, propertyName, property, rent, room, reporter, image } = req.body;

  if (!id) {
    return res.status(404).json({ message: "Undefined rental" });
  }
  Rental.updateOne(
    { user: req.user.userId, "rental._id": id },
    {
      $set: {
        "rental.$.propertyName": propertyName,
        "rental.$.property": property,
        "rental.$.rooms": room,
        "rental.$.rentPrice": rent,
        "rental.$.reporterName": reporter,
        "rental.$.image": image,
      },
    }
  ).exec((err, rental) => {
    if (err) return res.status(404).json({ message: err });
    if (rental) {
      res.status(200).json({ rental });
    }
  });
};
exports.deleteRental = (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(404).json({ message: "Undefined rental" });
  }
  Rental.updateOne(
    { user: req.user.userId },
    {
      $pull: { rental: { _id: id } },
    }
  ).exec((err, rental) => {
    if (err) return res.status(404).json({ message: err });
    if (rental) {
      res.status(200).json({ message: "Delete Successfully" });
    }
  });
};
exports.addNote = (req, res) => {
  let { description } = req.body;
  Rental.updateOne(
    { "rental._id": req.body.id },
    {
      $push: {
        "rental.$.note": {
          description: description,
        },
      },
    },
    { upsert: true }
  ).exec((err, note) => {
    if (err) {
      return res.status(400).json({ note });
    }
    if (note) {
      return res.status(200).json({ note });
    }
  });
};
function searchItem(rental) {
  let searchResult = [];
  for (let i = 0; i < rental.length; i++) {
    for (let item of rental[i].rental) {
      searchResult.push(item);
    }
  }
  return searchResult;
}
exports.searchRental = (req, res) => {
  let searchTerm = req.query.searchTerm;
  let searchType = req.query.searchType;
  let searchPrice = req.query.searchPrice;

  Rental.find({})
    .lean()
    .exec((err, rental) => {
      if (err) res.status(400).json({ message: "Not found" });
      if (rental.length === 0) res.status(400).json({ message: "Not found" });
      if (rental.length > 0) {
        const regex = new RegExp(searchTerm, "i");
        const regexType = new RegExp(searchType, "i");
        const regexPrice = new RegExp(searchPrice, "i");
        let searchArray = searchItem(rental);
        let matchResult;
        if (regex && searchTerm) {
          matchResult = searchArray.filter((match) =>
            match.propertyName.match(regex)
          );
        }
        if (regexType && searchType) {
          matchResult = searchArray.filter((match) =>
            match.property.match(regexType)
          );
        }
        if (regexPrice && searchPrice) {
          console.log("alo");
          matchResult = searchArray.filter((match) =>
            match.rentPrice.match(regexPrice)
          );
        }
        res.status(200).json(matchResult);
      }
    });
};
function createRentalList(rentalList) {
  let rental = [];
  for (let i = 0; i < rentalList.length; i++) {
    for (let item of rentalList[i].rental) {
      rental.push(item);
    }
  }
  return rental;
}
exports.getAllRental = (req, res) => {
  Rental.find({})
    .lean()
    .exec((err, rental) => {
      err ? res.status(404).json({ message: err }) : null;
      if (rental) {
        let rentalList = createRentalList(rental);
        return res.status(200).json(rentalList);
      }
    });
};
