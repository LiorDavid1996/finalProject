const express = require("express");
const cors = require("cors");
const fileUpload =require('express-fileupload')
const dotenv = require("dotenv");
dotenv.config();
const UserRouter = require("./routes/user");
const BabysitterRouter=require("./routes/babysitter")
const PostRouter=require('./routes/post')
const uploadImagesRouter=require('./routes/upload')

require("./DB");
const app = express();
app.use(express.json());
app.use(cors());
app.use(fileUpload({useTempFiles: true}))
app.use("/user", UserRouter);
app.use("/bs", BabysitterRouter);
app.use("/post", PostRouter);
app.use("/Images", uploadImagesRouter);








const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}..`);
});
