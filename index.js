const express = require('express')
const app = express()
const port =3001
const path=require('path')
const cors = require('cors')
const mongoose = require('mongoose')

app.use(express.json())
app.use(express.urlencoded({extended:true})) // this line create a middleware that will parse the body of the request
app.use(express.static(path.join(__dirname,'public')))

mongoose.connect('mongodb://localhost:27017/Thewatch')

app.use(cors())

let watchSchema = new mongoose.Schema({
    name:String,
    price:String,
    description:String,
    image:String
})
let watchModel = mongoose.model('watch',watchSchema)
app.get('/',async(req,res)=>{
    
        const watches = await watchModel.find()
        res.json(watches)
})

app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})