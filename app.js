const express= require('express'); 
const ProductData=require('./src/model/productdata');
const BookUserData=require('./src/model/bookuserdata');
const cors=require('cors');
const jwt=require('jsonwebtoken');
const bodyparser=require('body-parser');
const PORT = process.env.PORT || 3000;
var app=new express();
app.use(cors());
app.use(bodyparser.json());
const path = require('path');
// app.use(express.static('./dist/ProductApp'));
app.use(express.static('${__dirname}/ProductApp/dist/'));
username="";
password="";
// const user={username:'',
// password:''}
//middleware to verify token
function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
      return res.status(401).send('Unauthorized request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === 'null') {
      return res.status(401).send('Unauthorized request');
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
      return res.status(401).send('Unauthorized request');
    }
    req.userId = payload.subject;
    next();
  }
//get users
app.get('/api/users',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    BookUserData.find().then(function(users){
       
        res.send(users);
    });
    });

//login
app.post('/api/login',(req,res)=>{
 console.log("inside app.js")

        let paylaod={subject:username+password};
         let token=jwt.sign(paylaod,'secretKey');
        res.status(200).send({token});
})



//get products
app.get('/api//products',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    ProductData.find().then(function(products){
        res.send(products);
    });
    });

 //get product by id   
    app.get('/api//:id',  (req, res) => {
  
        const id = req.params.id;
          ProductData.findOne({"_id":id})
          .then((product)=>{
              res.send(product);
          });
      });




    
    
 //get user by username
  app.get('/api//getusername',  (req, res) => {
  
    const user = req.params.username;
    UserData.findOne({"user":user})
      .then((fuser)=>{
          res.send(fuser);
      });
  });
      

 //insert book    
    app.post('/api//insert',verifyToken,function(req,res){
        console.log("inside insert");
        res.header("Access-Control-Allow-Origin","*");
        res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
        console.log(req.body);
       
        var product={
            productId : req.body.product.productId,
            productName : req.body.product.productName,
            productCode : req.body.product.productCode,
            releaseDate : req.body.product.releaseDate,
            description : req.body.product.description,
            price : req.body.product.price,
            starRating :req.body.product.starRating,
            imageUrl : req.body.product.imageUrl
        }
        var product=new ProductData(product);
        product.save();
        
   
});
//insert user
app.post('/api/insertuser',function(req,res){
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log("inside insert user");
    var user={
        username : req.body.user.username,
        age : req.body.user.age,
        email : req.body.user.email,
        password: req.body.user.password,
      
    }
   
    var user=new BookUserData(user);
    user.save();
   
   
   
    
    

});

//delete products
app.delete('/api/remove/:id',(req,res)=>{
   
    id = req.params.id;
    ProductData.findByIdAndDelete({"_id":id})
    .then(()=>{
        console.log('success')
        res.send();
    })
  });

//update products
  app.put('/apin/update',(req,res)=>{
    console.log(req.body);
    
    id=req.body._id,
    productId= req.body.productId,
    productName = req.body.productName,
    productCode = req.body.productCode,
    releaseDate = req.body.releaseDate,
    description = req.body.description,
    price = req.body.price,
    starRating = req.body.starRating,
    imageUrl = req.body.imageUrl
   ProductData.findByIdAndUpdate({"_id":id},
                                {$set:{"productId":productId,
                                "productName":productName,
                                "productCode":productCode,
                                "releaseDate":releaseDate,
                                "description":description,
                                "price":price,
                                "starRating":starRating,
                                "imageUrl":imageUrl}})
   .then(function(){
   
       res.send();
   })
 });

 app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist//ProductApp/index.html'));
   });
// app.get('*', (req, res) => {
//   res.sendFile(`./ProductApp/dist/index.html`); // load the single view file (angular will handle the page changes on the front-end)
// });
   
app.listen(PORT, () => {
  console.log(`App is running on port ${ PORT }`);
});
