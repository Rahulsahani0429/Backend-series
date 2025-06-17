
import { useState } from 'react';
import './App.css'

function App() {
  let [count,setcount] = useState(10)
  
// const count = 10;
const addvalue = () =>{
  
  const add = count +1;
  setcount(add)
  console.log("add the value", add)

}
const removeValue = () => {
  if (count > 0) {
    const remove = count - 1;
    setcount(remove);
    console.log("Removed the value:", remove);
  } else {
    console.log("Value is already zero, cannot go negative.");
  }
};

  return (
    <>
     <h1>Welcome to My Calculator</h1>
     <button >counted the value : {count}</button>
     <br></br>
     
     <button onClick={addvalue}> add the value {count}</button>
     <br></br>
     <button onClick={removeValue}>remove the value : {count}</button>
    </>
  )
}

export default App;
