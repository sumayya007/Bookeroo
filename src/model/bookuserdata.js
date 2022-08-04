const mongoose =require('mongoose');
// mongoose.connect('mongodb://localhost:27017/ProductDb');
mongoose.connect(`mongodb+srv://2WQ9IurjqctRc5zM:< 2WQ9IurjqctRc5zM  >@cluster0.3nral.mongodb.net/?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true //this line is not mandatory
}).then(()=>{
    console.log('Connected to MongoDB Cloud :)');
})
const Schema=mongoose.Schema;
var NewUserSchema=new Schema({
    username :String,
    email : String,
    age : String,
    password : String,
   
});

var BookUserData=mongoose.model('user',NewUserSchema);
module.exports=BookUserData;
