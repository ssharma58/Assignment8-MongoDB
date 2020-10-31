const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
// var budget = require('./server.json');
const mongoose = require("mongoose");
const namesModel = require("./models/schema");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/', express.static('public'));

let url = 'mongodb://localhost:27017/budget';

// namesModel.remove({id:10})
//             .then((data)=>{
//                 console.log(data)
//                 mongoose.connection.close();
//             })
//             .catch((connectionError)=>{
//                 console.log(connectionError)
//             })
/*app.get('/hello', (req, res) => {
    res.send('Hello World!');
});*/
// 1- fetch (get-buget) list all the items in the collection 
// 2- add insert (post -> buget) to insert 

 app.get('/budget', (req, res) => {
     // TODO: return the data
     mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("Connected to db");
     namesModel.find()
            .then((data)=>{
                console.log("db"+data)
                res.json(data);
                res.send(data)
              //  mongoose.connection.close();
            })
            .catch((connectionError)=>{
                console.log(connectionError)
            })
})
// get-budget 
// post-budget

.catch((connectionError)=>{
    console.log(connectionError)
})
});
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
  });

app.post('/budget', (req, res) => {
    // TODO: Insert data 
    // id, title, color {id: req.body.id, budget: req.body.title }
    mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    const newData = new namesModel({
        title: req.body.title,
        budget: req.body.budget,
        color: req.body.color,
    });
    namesModel.insertMany(newData)
    .then((data)=>{
        console.log("db" +data)
        res.send(data)
        mongoose.connection.close();
    })
    .catch((connectionError)=>{
        console.log(connectionError)
    })

    console.log(req.body)
    
});
/*var myBudget = JSON.parse(budget, function(key, value){
    return new value;
});*/

// console.log('My budget is', budget);

// console.log('The type of the budget is', typeof budget);

// console.log('The length of the budget is', Object.keys(budget).length);

