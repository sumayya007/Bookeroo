const mongoose =require('mongoose');
mongoose.connect('mongodb://localhost:27017/ProductDb');
const Schema=mongoose.Schema;
var NewUserSchema=new Schema({
    username :String,
    email : String,
    age : String,
    password : String,
   
});

var BookUserData=mongoose.model('user',NewUserSchema);
module.exports=BookUserData;