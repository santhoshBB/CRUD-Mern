import Axios from 'axios';
import './App.css';
import { useState, useEffect} from 'react';

function App() {
 
  const [brand, setBrand]=useState("");
  const [model, setModel]= useState(0)

  const [allcars, setAllcars]= useState([]);

  const [newcar, setNewcar]=useState('');


  let addToList = () => {
    Axios.post("http://localhost:3001/insert",{
      brand:brand,
      model:model
    })
  }
  useEffect(()=>{
    Axios.get("http://localhost:3001/readall").then((response)=> {
      setAllcars(response.data)
    })
  },[])

  let updateCar = (id) => {
     Axios.put('http://localhost:3001/update',{
      id:id,
      newcar:newcar
     })
  }
 
  let deleteCar = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`)
 }
 
  return (
    <div className="App">
      <h1> CRUD APP</h1>
      <label>Brand:</label>
      <input type="text" onChange={(e)=>{setBrand(e.target.value)}} />
      <label>Model:</label>
      <input type="number" onChange={(e)=>{setModel(e.target.value)}}/>
      <button type="submit" onClick={addToList}> Add to list</button>

     
      {allcars.map((value,key)=>{
        return <div key={key} className='food'>
          <p>Brand:  {value.brand}</p>
          <p> Model:  {value.model}</p>
          <input type='text' placeholder='Enter to update car name' onChange={(e)=>{setNewcar(e.target.value)}}></input>
          <button onClick={()=>updateCar(value._id)}>Update</button>
          <button onClick={()=>deleteCar(value._id)}>Delete</button>
        </div>
      })}
    </div>
  );
}

export default App;
