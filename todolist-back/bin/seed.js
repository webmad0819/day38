const mongoose = require("mongoose");
let Task = require("../models/Task");

mongoose
  .connect("mongodb://localhost/todolist-back", { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );

    Task.create([
      { name: "Ir a la peluquería" },
      { name: "Estudiar" },
      { name: "Comprar el pan" },
      { name: "Recoger al niño en el cole" },
      { name: "Ya hecha", done: true }
    ]).then(done => {
      console.log("All tasks were added to the DB. Thanks");
      process.exit(0);
    });
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });
