// js canvas drawing function stuff
var canvas = document.getElementById('drawingCanvas');
var ctx = canvas.getContext('2d');
var isDrawing = false;
var lastX = 0;
var lastY = 0;
var strokeColor = 'black';
var lineWidth = 10; // Default line width
// mouse down
canvas.addEventListener('mousedown', function (e) {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
// event listener for mouse moving
canvas.addEventListener('mousemove', function (e) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = lineWidth; // Set the line width
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
});
// mouse up function
canvas.addEventListener('mouseup', function () {
  isDrawing = false;
});
// mouse out function
canvas.addEventListener('mouseout', function () {
  isDrawing = false;
});
// event listener for color selecting
document.querySelectorAll('.colorSelector').forEach(item => {
  item.addEventListener('click', function () {
    strokeColor = this.style.backgroundColor;
  });
});



// Function to download the canvas drawing as an image
function download() {
  let link = document.createElement("a")
  link.download = 'painting.png'
  link.href = canvas.toDataURL()
  link.click()
}

// Event listener for selecting an image file to upload
let painting = document.getElementById("paintingfile")
let paintingimg = document.getElementById("paintingimg")
const uploadEndpoint = "http://127.0.0.1:8008/api/paint_api/uploadPainting/"
function sendPainting() {
  // Prepare payload containing the painting data and user ID
  let payload =
  {
   "painting":paintingimg.src, // The painting image data
   "user_id":localStorage.getItem("uid") // The user ID obtained from localStorage
  }

  // Send a POST request to the upload endpoint with the payload
  fetch(uploadEndpoint,
    {
      method: "POST", // HTTP POST method
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", // Include cookies in the request
      body: JSON.stringify(payload) // Convert payload to JSON string
    }).then(response => {
      // Check if the response is successful (HTTP status code 2xx)

      if (response.ok) {
        return response.text(); // Return the response text if successful
      }

      // Throw an error if the response is not successful
      throw new Error("Network response failed")
    }).then(data => {
      // Do something with the response data if needed
    })
    .catch(error => {
      // Log an error message if there was a problem with the fetch
      console.error("There was a problem with the fetch", error);
    });
}
// Event listener for selecting an image file
painting.addEventListener('change', function (event) {
  const file = event.target.files[0]; // Get the selected file
  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imageUrl = event.target.result; // Get the image URL
      const image = new Image();
      image.src = imageUrl;
      image.onload = function () {
        paintingimg.src = image.src
      };
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  }
});