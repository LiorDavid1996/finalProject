const mongoose = require("mongoose");
const CONNECTION_STRING = process.env.CONNECTION_STRING
mongoose
  .connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connection succeed"))
  .catch((error) => {
    console.log("connection", error.message);
  });

module.exports = mongoose.connection;
