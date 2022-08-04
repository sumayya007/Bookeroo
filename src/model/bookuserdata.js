const mongoose =require('mongoose');
// mongoose.connect('mongodb://localhost:27017/ProductDb');
// mongoose.connect(`mongodb+srv://2WQ9IurjqctRc5zM:%3Cmymongodbatlas007%3E@cluster0.3nral.mongodb.net/test`,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true //this line is not mandatory
// }).then(()=>{
//     console.log('Connected to MongoDB Cloud :)');
// })
mongoose.connect('mongodb+srv://2WQ9IurjqctRc5zM:mymongodbatlas@cluster0.3nral.mongodb.net/test');
const Schema=mongoose.Schema;
var NewUserSchema=new Schema({
    username :String,
    email : String,
    age : String,
    password : String,
   
});

var BookUserData=mongoose.model('user',NewUserSchema);
module.exports=BookUserData;
