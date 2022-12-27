const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const babysitterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    charge:{
        type:Number,
        require:true
    },
    picture: {
        type: String,
        trim: true,
        default:
          "https://res.cloudinary.com/dmhcnhtng/image/upload/v1643044376/avatars/default_pic_jeaybr.png",
      },
    
    details: {
        bio: {
          type: String,
        },
        otherName: {
          type: String,
        },
        job: {
          type: String,
        },
        workplace: {
          type: String,
        },
        highSchool: {
          type: String,
        },
        college: {
          type: String,
        },
        currentCity: {
          type: String,
        },
        hometown: {
          type: String,
        },
        relationship: {
          type: String,
          enum: ["Single", "In a relationship", "Married", "Divorced"],
        },
        instagram: {
          type: String,
        },
        bs:{
            type:Boolean
        },
      },
      savedPosts: [
        {
          post: {
            type: ObjectId,
            ref: "Post",
          },
          savedAt: {
            type: Date,
            default: new Date(),
          },
        },
      ],
    


  
});

module.exports = mongoose.model("babysitters", babysitterSchema);