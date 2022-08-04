const mongoose =require('mongoose');
// mongoose.connect('mongodb://localhost:27017/ProductDb');
mongoose.connect(`mongodb+srv://2WQ9IurjqctRc5zM:< 2WQ9IurjqctRc5zM  >@cluster0.3nral.mongodb.net/?retryWrites=true&w=majority`,{
    useNewUrlParser:true,
    useUnifiedTopology:true //this line is not mandatory
}).then(()=>{
    console.log('Connected to MongoDB Cloud :)');
})
const Schema=mongoose.Schema;
var NewProductSchema=new Schema({
    productId : Number,
    productName : String,
    productCode : String,
    releaseDate : String,
    description : String,
    price : Number,
    starRating :Number,
    imageUrl : String
});

var ProductData=mongoose.model('product',NewProductSchema);
module.exports=ProductData;
