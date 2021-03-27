import {useState, useEffect} from 'react';
import uuid from 'react-uuid';
import Button from './front_end/button.jsx';
import Table from './front_end/table.jsx';
import Input from './front_end/input.jsx';
import './data.css';
import './App.css';






// Function that will fetch data
const fetchData = async() => {
  const res = await fetch("http://localhost:5555/");
  const dataJSON = await res.json();
  return dataJSON;
}

function App(props) {

  let nameIn;
  let priorityIn;


  let [data, changeData] = useState([]);


  // Fetch data at the beginning when the component did mount
  useEffect(() => {
    fetchData().then(guest => {
      changeData(guest);
    })
  }, []);

  console.log(data);

  // Handling inputs
  const infoCollect = () => {
    // Collect info
    nameIn = document.getElementById("nameInput").value;
    priorityIn = document.getElementById("priorityInput").value;

    if (nameIn === "" || priorityIn === "") {
        console.log("Fields cannot be empty!");
    } else {
        // Set the values inside input fields to blank
        document.getElementById("nameInput").value = "";
        document.getElementById("priorityInput").value = "";

        // Handling data
        let dataTemp = [];
        dataTemp = [...data, {"id": uuid(), "name": nameIn, "priority": priorityIn}];
        changeData(dataTemp);

        console.log(nameIn + ", " + priorityIn);
    }
    
  }


  return (
    <div className="App">
      <h1>Waitlist</h1>
      <div className="TableDiv">

        <Table readdata={data} />
        
      </div>
      
      
      <div className="DataInput">
        <Input id="nameInput" holder="Enter Name Here" />
        <Input id="priorityInput" holder="Enter Priority Here" />
        <Button content="Add New Guest" onclick={infoCollect} />
        <Button content="Pop Guest" />
      </div>

    </div>
  );
}

export default App;
