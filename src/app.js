require('./config/config');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000;

let app = express();
app.use(express.static(publicPath));
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
    .then(()=>{
        console.log('Connected');
    })
    .catch(e=>{
        console.log(e);
})


app.get('/', (req,res)=>{
    res.send('Hello World');
})


app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
  })

 