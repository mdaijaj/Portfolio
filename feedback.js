// using mysql knex
const express=require("express");
var bodyParser=require("body-parser")

//this is the framework app express 
var app=express();										

//use of ejs file ejs convert data and fronted						
app.use(express.json())
app.use(bodyParser.json())

//mysql connect database syntax
var conn={
	host: "localhost",										
	user: "root",
	password: "enter password",
	database: "portfolio"
}

//knex mysql connect using module of knex
var knex=require("knex")({
	client: "mysql", connection: conn
});  


//create users table
knex.schema.hasTable('feedback')
.then((exists)=>{		
	if (!exists){
		knex.schema.createTable('feedback',(table4)=>{
		table4.increments('id').primary();
		table4.string('name').notNullable();
		table4.string('email').unique();
		table4.integer('phone')
		table4.string('comments')
		console.log("feedback table  created successfully")
		})
		.catch((err)=>{console.log(err.message)})
	}
	else{
		console.log("feedback table is allready exists")
	}
});

//feedback backend api
app.post('/feedback', (req,res)=>{
    console.log("aijaj")
    knex('feedback').insert({id: null, name: req.body.name, email: req.body.email, phone: req.body.phone, comments: req.body.comments})
    .then((data)=>{
        console.log("feedback sent sucessfully")
        return res.send("feedback sent sucessfully")
    })
    .catch((err)=>{
        console.log(err)
    })
})

var port=process.env.Port || 4000 ;
app.listen(port,()=>{
	console.log("server is running",port);
});