// Define the endpoint for fetching paintings from the server
const galleryEndpoint = "http://127.0.0.1:8008/api/paint_api/getPainting/"

// Get the gallery container element from the DOM
let gallery =  document.getElementById("gallery")

// Function to fetch paintings from the server and display them in the gallery
function getPosts() {

    // Fetch paintings from the server using the defined endpoint
    fetch(galleryEndpoint,
      {
        method: "GET", // HTTP GET method
        headers: {
          "Content-Type": "application/json", // Request content type
        },
        credentials: "include", // Include cookies in the request
      }).then(response => {
           // Check if the response is successful (HTTP status code 2xx)
        if (response.ok) { // Parse the JSON response
          return response.json()
        }
        throw new Error("Network response failed")
      }).then(data => {

        // Log the fetched data to the console
        console.log("Response:", data);

        // Loop through each painting in the fetched data
        for(let i=0;i<data.paintings.length;i++)
        {
            // Create a new div element for the painting            
            let paintingDiv = document.createElement("div")

            // If either the paintingDiv or the gallery element is null, exit the function
            if(paintingDiv == null || gallery == null)
            return

            // Add the 'painting' class to the paintingDiv
            paintingDiv.classList.add("painting")

            // Create a new img element for the painting image
            let paintingimg = document.createElement("img")
            gallery.appendChild(paintingDiv)
            paintingDiv.appendChild(paintingimg)
            paintingimg.src = data.paintings[i].image


            // Append the artistCredit element to the paintingDiv
            let artistCredit = document.createElement("h2")
            artistCredit.innerText = `Painted By ${data.paintings[i].username}`
            paintingDiv.appendChild(artistCredit)
        }
        
      })
      .catch(error => {
      // Log an error message if there was a problem with the fetch

        console.error("There was a problem with the fetch", error);
      });
  }

  getPosts()