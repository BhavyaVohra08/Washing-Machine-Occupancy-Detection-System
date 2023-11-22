const frame = document.querySelector(".frame");

const vacant = document.querySelector('.vacant');
const occupied = document.querySelector('.occupied');


console.log(frame)

const url = "https://api.thingspeak.com/channels/2352418/fields/1.json?results=2"


// async function getData (url) {
//       const response = await fetch(url);

//       var data = await response.json();
//       console.log(data);

//       if (response) {
//             hideloader();
//       }
//       show(data);
// }

// getData(url);


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
      }, 5000); // 10000 milliseconds = 10 seconds
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
      if(data.feeds[size-1].field1[0]=="-") {
            occupancy = `<h1>Vacant</h1>`;
            comment = '<p>Wait karle madarchod, panvel nikalna hai kya</p>'
            occupied.classList.toggle('active');

      } else {
            occupancy = `<h1>Occupied</h1>`;
            comment = '<p>Jaldi ja madarchod, nahi toh woh bhi chud jayegi</p>'
            occupied.classList.remove('active');
            vacant.classList.toggle('active');
      }
      div.innerHTML = occupancy;
      div.innerHTML += comment;
}