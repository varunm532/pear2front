---
title: Housing Prices ML
permalink: /houseprices
layout: base
description: Tejas, Deva, and Abdullah's CUSTOM DATASET ML model.
---

<html lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Elite Estates</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #222;
            margin: 0;
            padding: 0;
            display: block;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: #333;
            border-radius: 8px;
            padding: 40px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            width: 400px;
        }
        h1 {
            text-align: center;
            margin-bottom: 20px;
            color: #fff;
            font-size: 24px;
        }
        label {
            display: block;
            margin-bottom: 10px;
            color: #fff;
            font-size: 16px;
        }
        input[type="text"],
        input[type="password"],
        select {
            width: calc(100% - 20px);
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #555;
            border-radius: 4px;
            box-sizing: border-box;
            background-color: #444;
            color: #fff;
            font-size: 16px;
        }
        button {
            width: calc(100% - 20px);
            padding: 10px;
            background-color: #525252;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #454746;
        }
    </style>
    <header>
        <h1>Elite Estates</h1>
    </header>
    <nav>
    </nav>
    <div class="main-content">
        <h2>Welcome to Elite Estates!</h2>
        <p>Fill in the details below to predict house price:</p>
        <form id="house-price-form">
            <label for="area">Area (in sqft):</label>
            <input type="number" id="area" name="area" required>
            <label for="bedrooms">Number of Bedrooms:</label>
            <input type="number" id="bedrooms" name="bedrooms" required>
            <label for="bathrooms">Number of Bathrooms:</label>
            <input type="number" id="bathrooms" name="bathrooms" required>
            <label for="stories">Number of Stories:</label>
            <input type="number" id="stories" name="stories" required>
            <label for="mainroad">Main Road:</label>
            <select id="mainroad" name="mainroad">
                <option value="choose">Choose</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            <label for="guestroom">Guest Room:</label>
            <select id="guestroom" name="guestroom">
                <option value="choose">Choose</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            <label for="basement">Basement:</label>
            <select id="basement" name="basement">
                <option value="choose">Choose</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            <label for="hotwaterheating">Hot Water Heating:</label>
            <select id="hotwaterheating" name="hotwaterheating">
                <option value="choose">Choose</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            <label for="airconditioning">Air Conditioning:</label>
            <select id="airconditioning" name="airconditioning">
                <option value="choose">Choose</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            <label for="parking">Parking:</label>
            <select id="parking" name="parking">
                <option value="choose">Choose</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            <label for="prefarea">Preferred Area:</label>
            <select id="prefarea" name="prefarea">
                <option value="choose">Choose</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </select>
            <label for="furnishingstatus">Furnishing Status:</label>
            <select id="furnishingstatus" name="furnishingstatus">
                <option value="choose">Choose</option>
                <option value="furnished">Furnished</option>
                <option value="semi-furnished">Semi-Furnished</option>
                <option value="unfurnished">Unfurnished</option>
            </select>
            <input type="submit" value="Predict Price">
        </form>
        <div id="predicted-price" class="predicted-price"></div>
        <div class="sample-images">
        </div>
    </div>
    <script>
        document.getElementById('house-price-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission
            // Collect form data
            const formData = {
                area: document.getElementById('area').value,
                bedrooms: document.getElementById('bedrooms').value,
                bathrooms: document.getElementById('bathrooms').value,
                stories: document.getElementById('stories').value,
                mainroad: document.getElementById('mainroad').value,
                guestroom: document.getElementById('guestroom').value,
                basement: document.getElementById('basement').value,
                hotwaterheating: document.getElementById('hotwaterheating').value,
                airconditioning: document.getElementById('airconditioning').value,
                parking: document.getElementById('parking').value,
                prefarea: document.getElementById('prefarea').value
            }
            // Make a POST request to the backend API
            fetch('http://127.0.0.1:8008/api/house_price/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                // Display the prediction result
                const predictedPrice = data.predicted_price;
                alert("Predicted price: $" + predictedPrice);
                document.getElementById('predicted-price').innerHTML = '<span class="predicted-price-text">Predicted price: $' + predictedPrice + '</span>';
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred while processing your request.');
            });
        });
    </script>
</html>
