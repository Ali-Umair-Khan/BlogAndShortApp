import mongoose, { Schema } from 'mongoose';

// Check if the model already exists before defining it
const Short = mongoose.models.Short || mongoose.model('Short', new Schema({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 40,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true }));

export default Short;

// export default mongoose.model.Short |        |  mongoose.model('Short', shortSchema);







/*************post model */

// // const mongoose = require('mongoose');

// import mongoose,{Schema} from 'mongoose';
// import validator from 'validator';

// const postSchema = new Schema({
//   title:{ 
//     type:String,
//     required:true
//    }, // String is shorthand for {type: String}
//   desc: {
//     type:String,
//     required:true,
//   },
//   img:{
//     type: String,
//     required:true,
//     validate:{
//       validator: validator.isURL,
//       message: 'Invalid URL for the image',
//     },
//   },
//   content:{
//     type:String,
//     required:true
//   },
//   username: {
//     type:String,
//     required:true,
//   },
//   date: { 
//     type: Date, 
//     default: Date.now 
//   }
// },{ timestamps: true });

// export default mongoose.models.Post || mongoose.model("Post", postSchema);

// // export default Post;