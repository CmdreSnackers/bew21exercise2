const express = require("express");
const app = express();

let parks = [
  {
    id: 1,
    name: "Yellowstone National Park",
    facilities: ["campgrounds", "visitor-center", "trails"],
  },
  {
    id: 2,
    name: "Zion National Park",
    facilities: ["trails", "visitor-center"],
  },
];

let visitors = [
  { id: 1, name: "John Doe", pastReservations: [1], upcomingReservations: [2] },
  { id: 2, name: "Jane Smith", pastReservations: [], upcomingReservations: [] },
];

let reservations = [
  { id: 1, parkId: 1, visitorId: 1, date: "2023-09-01" },
  { id: 2, parkId: 2, visitorId: 1, date: "2023-10-01" },
];

// Your routing, authentication, and controller code goes here

//home
app.get("/", (req, res) => {
  res.status(200).send("Hello, Home Page Here");
});

//parks
app.get("/parks", (req, res) => {
  if (!parks) {
    res.status(404).json("No Parks Found");
  } else {
    res.status(200).json(parks);
  }
});

app.get("/parks/:id", (req, res) => {
  const park = parks.find((p) => p.id.toString() === req.params.id);
  if (!park) {
    res.status(404).json("Park not found");
  } else {
    res.status(200).json(park);
  }
});

//visitors
app.get("/visitors", (req, res) => {
  if (!visitors) {
    res.status(404).json("No Visitors Found");
  } else {
    res.status(200).json(visitors);
  }
});

app.get("/visitors/:id", (req, res) => {
  const visitor = visitors.find((v) => v.id.toString() === req.params.id);
  const reservation = reservations.find((r) => r.id === visitor.id);
  const visitor_reserve = {
    ...visitor,
    pastReservations: reservation.id,
    upcomingReservations: reservation.id,
  };
  if (!visitor_reserve) {
    res.status(404).json("Visitor not found");
  } else {
    res.status(200).json(visitor);
  }
});

//reservations
app.get("/reservations", (req, res) => {
  if (!reservations) {
    res.status(404).json("No Reservations Found");
  } else {
    res.status(200).json(reservations);
  }
});

app.get("/reservations/:id", (req, res) => {
  const reservation = reservations.find(
    (r) => r.id.toString() === req.params.id
  );
  if (!reservation) {
    res.status(404).json("Reservation not found");
  } else {
    res.status(200).json(reservation);
  }
});

app.listen(5000, () => {
  console.log("National Park Visitor System is running on port 5000");
});
