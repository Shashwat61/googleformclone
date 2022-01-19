const express=require('express')
const app=express()
const cors=require('cors')
const PORT=process.env.PORT || 8000
const {MongoClient} = require('mongodb');
require('dotenv').config()
const router=require('./routes/route')
const mongoose  = require("mongoose");


app.listen(PORT,(req,res)=>{
    console.log('server is running on port',PORT)
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',router)

// async function listDataBases(client){
//    const databasesList = await client.db().admin().listDatabases()
//     console.log(databasesList)
// }
mongoose.Promise=global.Promise
// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true)

mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true })
    .then(() => { console.log('Connected to MongoDB: %s \n ', process.env.MONGODB_URI) }) 
    .catch((err) => { console.log('MongoDB connection error: %s \n', err); })
