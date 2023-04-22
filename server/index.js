const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors= require('cors')
const CarModel= require('./models/Cars')

app.use(express.json());
app.use(cors());


mongoose.connect('mongodb+srv://EmailID:****@cluster0.pftshgj.mongodb.net/cars?retryWrites=true&w=majority',{
    useNewUrlParser: true,
})

app.post('/insert', async(req, res)=>{
    const brand = req.body.brand;
    const model = req.body.model;
    const car= new CarModel({brand: brand, model: model})
   try{
     await car.save();
   }catch(err){
    console.log(err)
   }

})

app.get('/readall', async(req,res) => {
  let data= await CarModel.find({})
  res.send(data)
     
})


// app.put('/update',async(req,res)=>{
//     const newcar= req.body.newcar;
//     const id = req.body.id;
//     try{
//      await CarModel.findById(id,(err,updatedCar)=>{
//           updatedCar.brand= newcar;
//           updatedCar.save();
//           res.send("updated")
//       })
//     }catch(err){
//       console.log(err);
//     }
// })

app.put("/update",(req,res)=>{
    const newcar= req.body.newcar;
    const id= req.body.id;

    CarModel.findById(id).then(updated=>{
        updated.brand= newcar;
        updated.save();
        res.send("updated")
    }).catch(err=>console.log(err))
})

app.delete("/delete/:id", async(req,res,)=>{
  try {
    await CarModel.findByIdAndRemove(req.params.id).exec()
   
   
  } catch (error) {
    console.log(error);
  }
   
  
})



app.listen(3001, () => {
    console.log("connected on port 3001"); 
})