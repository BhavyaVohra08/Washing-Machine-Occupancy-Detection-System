const frame = document.querySelector(".frame");

const vacant = document.querySelector('.vacant');
const occupied = document.querySelector('.occupied');


console.log(frame)

const url = "https://api.thingspeak.com/channels/2352418/fields/1.json?results=2"


async function getData(url) {
      try {
          const response = await fetch(url);
          const data = await response.json();
          console.log(data);
  
          if (response.ok) {
              hideloader();
              show(data);
          }
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }
  
  // Function to update data every 10 seconds
  function updateDataPeriodically() {
      getData(url); // Get data initially
      setInterval(() => {
          getData(url); // Get data every 10 seconds
      }, 5000); // 5000 milliseconds = 5 seconds
  }
  
  updateDataPeriodically(); // Start updating data


function hideloader() {
      document.querySelector('#loading').style.display = 'none';
}



function show (data) {
      var div = document.querySelector(".occupancy__texts");
      const size = data.feeds.length;
      // let info = `<h1>${data.feeds[size-1].field1}</h1>`;
      // console.log(data.feeds[1].field1);
      console.log(data.feeds[size-1].field1[0]=="-");
      var occupancy = "";
      var comment = "";
      if(data.feeds[size-1].field1[0]=="-") { // vacant
            occupancy = `<h1 style="color: green;">Vacant</h1>`;
            comment = '<p>Run fast, else it will get occupied</p>'
            document.querySelector(".images").src="washing-machine-isolated-on-white-background-vector-7639505-removebg-preview.png"

      } else {
            occupancy = `<h1 style="color: red;">Occupied</h1>`;
            comment = '<p>Please wait...Check after a few minutes</p>'
            document.querySelector(".images").src="occupied-removebg-preview.png"
      }
      div.innerHTML = occupancy;
      div.innerHTML += comment;
}