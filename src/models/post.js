// const mongoose = require('mongoose');

import mongoose,{Schema} from 'mongoose';
import validator from 'validator';

const postSchema = new Schema({
  title:{ 
    type:String,
    required:true
   }, // String is shorthand for {type: String}
  desc: {
    type:String,
    required:true,
  },
  img:{
    type: String,
    required:true,
    validate:{
      validator: validator.isURL,
      message: 'Invalid URL for the image',
    },
  },
  content:{
    type:String,
    required:true
  },
  username: {
    type:String,
    required:true,
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
},{ timestamps: true });

export default mongoose.models.Post || mongoose.model("Post", postSchema);

// export default Post;