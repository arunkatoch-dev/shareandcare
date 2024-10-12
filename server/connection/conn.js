const mongoose = require("mongoose");
const connection = process.env.CONN;

mongoose
  .connect(connection)
  .then(() => {
    console.log(`database connected successfully...`);
  })
  .catch((error) => {
    console.log("database error: ", error);
  });
