const express=require('express')
const cors=require('cors')
const volleyball=require('volleyball')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const path=require('path')

dotenv.config()
const app=express()

mongoose.connect(process.env.MONGO_DB,{
	useNewUrlParser:true,
	useCreateIndex:true,
	useUnifiedTopology:true,
	useFindAndModify:false	
}, (err)=>{
	if(err) {console.log(err)}
	else {console.log("Connected to the DB successfully!")}
})

app.use(cors())
app.use(volleyball)
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const itemRoute=require('./routes/itemRoute')
app.use('/api/items', itemRoute)

//Serve static assets if in production
if(process.env.NODE_ENV==='production'){
	//set static folder
	app.use(express.static('client/build'))
	app.get('*', (req,res)=>{res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))}) 
}

const port=process.env.PORT || 5000
app.listen(port, ()=>{console.log(`Server started on ${port}`)})