import {useState, useEffect} from 'react';
import uuid from 'react-uuid';
import Button from './front_end/button.jsx';
import Table from './front_end/table.jsx';
import Input from './front_end/input.jsx';
import './data.css';
import './App.css';
import './front_end/style/modal.css';
import Modal from './front_end/modal.jsx';
import CloseButton from './front_end/clsbtn.jsx';



const API = "http://localhost:5555/api/";


// Function that will fetch data
const fetchData = async() => {
  const res = await fetch(API);
  const dataJSON = await res.json();
  return dataJSON;
}

function App(props) {

  let nameIn;
  let priorityIn;
  let clearCount = 0;

  let [data, changeData] = useState([]);
  let [modalVis, changeVis] = useState(false);
  let [modalContent, changeContent] = useState([]);
  let [btnDisable, changeDisable] = useState(true);

  // Fetch data at the beginning when the component did mount
  useEffect(() => {
    fetchData().then(guest => {
      changeData(guest);
    })
  }, []);


  /**
   * Handling inputs (add method)
   */
  const infoCollect = () => {
    // Collect info
    nameIn = document.getElementById("nameInput").value;
    priorityIn = parseInt(document.getElementById("priorityInput").value);

    if (nameIn === "" || priorityIn === "") {
        console.log("Fields cannot be empty!");
    } else {
        // Set the values inside input fields to blank
        document.getElementById("nameInput").value = "";
        document.getElementById("priorityInput").value = "";

        // Handling data
        fetch(API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({"id": uuid(), "name": nameIn, "priority": priorityIn})
        }).then(res => {
          // After making the POST request, fetch the data from server again
          // Now that we have the newly changed data, we change the state of our
          // old data to the new one and render it
          fetchData().then(guest => {
            changeData(guest);
          });
          return res;
        }).catch(err => {
          console.log(err);
        })

        // let dataTemp = [];
        // dataTemp = [...data, {"id": uuid(), "name": nameIn, "priority": priorityIn}];
        // changeData(dataTemp);
       

        console.log(nameIn + ", " + priorityIn);
    }
    
  }

  /**
   * Pop method
   */
  const popGuest = () => {
    // Find the max priority value among the guest
    fetch(API, {
      method: 'DELETE'
    }).then(res => {
      // After making the DELETE request, fetch the newly changed data
      // and render it.
      fetchData().then(guest => {
        changeData(guest);
      });
      return res.json();
    }).then(data => {
      // changeVis(true);
      changeContent(data);

      console.log("inside pop: " + data.length);

      // Check if there's anything to pop
      if (data.length === 0) {
        changeVis(false);
        console.log('nothing to pop...');
      } else {
        changeVis(true);
      }
      console.log(data);

      return data;

    }).catch(err => {
      console.log(err);
    });
    
  }


  // Keep track of the amount of cleared items
  const incClearCount = () => {
    document.getElementById('clear-count').textContent = ++clearCount;
    console.log('count incremented');
  }

  return (
    <div className="App">
      <div>
              <p id="clear-count">{clearCount}</p>  
      </div>   
      <h1>Waitlist</h1>
      <div className="TableDiv">

        <Table readdata={data} />
        
      </div>
      
      <div className="Filler">
          
      </div>
      <div className="DataInput">
        
        <Input id="nameInput" holder="Enter Name Here" type="text" />
        <Input id="priorityInput" holder="Enter Priority Here" type="number" />
        <Button content="Add New Guest" onclick={infoCollect} />
        <Button content="Pop Guest" onclick={() => {
          popGuest();   
          }} 
          
        />
        
        
      </div>

      {console.log(modalVis)}

      {(modalVis === false) ? (null) : <div className="Wrapper">

          
          {/* The 3 lines below are just for debugging */}
          {/* {console.log("modal length: " + modalContent.length)}
          {console.log("count: " + document.getElementById('clear-count').textContent)} */}
          {/* {(parseInt(document.getElementById('clear-count').textContent) === modalContent.length) ? console.log('reached') : console.log('not yet')} */}

          <div className="Modal-Wd">
            <div className="InnerModal-Wd">
              <Modal state={modalVis} content={modalContent} clearDetect={incClearCount} />
            </div>

      
            <div className="CloseBtnWrapper">
              <div className="CloseBtn">
                <CloseButton 
                content="Done" 
                onclick={() => {
                  changeVis(false);
                }} 
                disable="true"

                />
                {/* {(parseInt(document.getElementById('clear-count').textContent) === modalContent.length) ? (
                  (document.getElementById('cls-btn').style.opacity = 1) &&
                  (document.getElementById('cls-btn').style.pointerEvents = "auto")
                ) : console.log('not yet')} */}
              </div>
            </div>

            
              
          </div>
        </div>}

    </div>
  );
}

export default App;
