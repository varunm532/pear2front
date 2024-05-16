---
layout: base
title: Meme Maker
description: Tejas' CPT feature.
permalink: /editor
---

<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sixtyfour&display=swap" rel="stylesheet">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Meme Maker</title>
    <style>
        body {
            font-family: 'Sixtyfour', sans-serif;
            background-color: #cbf6fc;
            margin: 0;
            padding: 0;
        }

        h1 {
            text-align: center;
            color: #333;
        }

        div {
            margin-bottom: 15px;
        }

        label {
            display: block;
            margin-bottom: 5px;
            color: #555;
        }

        input[type="file"],
        input[type="text"] {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        input[type="checkbox"] {
            margin-right: 5px;
        }

        button {
            background-color: #4CAF50;
            color: #fff;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }


        .container {
            text-align: center;
            margin-top: 20px;
        }

        .bottom-half {
            padding: 20px;
            border-radius: 4px;
            display: inline-block;
        }

        #uploadedImage {
            max-width: 100%;
            display: none;
            margin-top: 10px;
        }

        #downloadButton {
            margin-top: 10px;
        }
    </style>

</head>
<body>

<h1>Meme Maker</h1>

<div>
    <label for="imageInput">Choose Image File:</label>
    <input type="file" id="imageInput" accept="image/*">
</div>

<div>
    <label for="topText">Top Text:</label>
    <input type="text" id="topText" placeholder="Enter top text">
</div>

<div>
    <label for="bottomText">Bottom Text:</label>
    <input type="text" id="bottomText" placeholder="Enter bottom text">
</div>
            <input type="checkbox" id="addToDatabase" name="addToDatabase">
            <label for="addToDatabase">Add to Database</label>
<br>
<button class='button' onclick="makeMeme()">Generate Meme</button>

<div id="result"></div>
<div class="container">
    <div class="bottom-half">
        <h1 class="p1"><strong>Meme Result</strong></h1>
        <img id="uploadedImage" src="" alt="Uploaded Image" style="max-width: 100%; display: none;">
        <br>
        <button id="downloadButton" class="button">Download Meme</button>
        <br>
    </div>
</div>

<script>
    uploadedImageName = "";

    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default',
        credentials: 'omit',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    const post_options = {
        method: 'POST',
        mode: 'cors',
        cache: 'default',
        credentials: 'omit',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    const url = "http://127.0.0.1:8008/api/memeforge/maker/";
    
    function error(message) {
        console.error(message);
    }
    
    function makeMeme() {
        const imageInput = document.getElementById('imageInput');
        const topText = document.getElementById('topText').value;
        const bottomText = document.getElementById('bottomText').value;
        const uploadedImage = document.getElementById('uploadedImage');
        const addToDatabaseCheckbox = document.getElementById('addToDatabase');

        const file = imageInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
    
            reader.onload = function (e) {
                const base64data = e.target.result.split(',')[1];
                const filename = file.name;
                const fileExtension = filename.split('.').pop();
                const addToDatabase = addToDatabaseCheckbox.checked;
                uploadedImageName = file.name;
                const data = {
                    base64data: base64data,
                    top_text: topText,
                    bottom_text: bottomText,
                    addToHistory: addToDatabase,
                    filename: filename,
                };
    
                const image_options = {
                    method: 'POST',
                    mode: 'cors',
                    cache: 'default',
                    credentials: 'omit',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                };
    
                fetch(url, image_options)
                    .then(response => {
                        if (response.status !== 200) {
                            error('Api error: ' + response.status);
                            return;
                        }
                        response.json().then(data => {
                            const memeImage = new Image();
                            memeImage.src = 'data:image/' + fileExtension + ';base64,' + data['base64image'];
    
                            memeImage.style.maxHeight = '100%';
    
                            uploadedImage.src = memeImage.src;
                            uploadedImage.style.display = 'block';
    
                            memeImage.onload = function () {
                                const parent = document.querySelector('.bottom-half');
                                const ratio = parent.clientWidth / memeImage.width;
    
                                if (ratio < 1) {
                                    const maxHeight = ratio * memeImage.height;
                                    parent.style.height = (maxHeight + 175) + 'px';
                                } else {
                                    parent.style.height = (memeImage.height + 175) + 'px';
                                }
                            };
                        });
                    });
            };
        }
    }
    function handleDownloadClick() {
        const uploadedImage = document.getElementById('uploadedImage');
        const memeImage = new Image();
        memeImage.src = uploadedImage.src;

        if (uploadedImage.width == 0) {
            alert('Please upload an image before trying to download');
            return;
        }
        const downloadLink = document.createElement('a');
        downloadLink.href = memeImage.src;
        downloadLink.download = uploadedImageName.split('.')[0] + "_meme." + uploadedImageName.split('.')[1];
        downloadLink.style.display = 'none';

        document.body.appendChild(downloadLink);
        downloadLink.click();

        document.body.removeChild(downloadLink);

    }
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.addEventListener('click', handleDownloadClick);
</script>

</body>

<head>
    <link rel="stylesheet" href="https://pyscript.net/releases/2024.1.1/core.css" />
    <script type="module" src="https://pyscript.net/releases/2024.1.1/core.js"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sixtyfour&display=swap" rel="stylesheet">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Gallery</title>
    <style>
        body {
            font-family: sans-serif;
            background: #cbf6fc;
            margin: 0;
            padding: 20px;
        }
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
        }
        .gallery-item {
            position: relative;
            overflow: hidden;
        }
        .gallery-item img {
            width: 100%;
            height: auto;
            border: 2px solid gold;
            transition: transform 0.3s;
            cursor: pointer;
        }
        .gallery-item:hover img {
            transform: scale(1.1);
        }
        .modal {
            display: none;
            position: fixed;
            z-index: 1000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.8);
        }
        .modal-content {
            margin: 20px auto;
            display: block;
            max-width: 80%;
            max-height: 80%;
        }
        .close {
            color: white;
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 30px;
            font-weight: bold;
            cursor: pointer;
        }
        .close:hover {
            color: #999;
        }
    </style>
</head>

<h1>The Gallery:</h1>

<body>
    <div class="gallery">
    </div>
    <div id="modal" class="modal">
        <span class="close">&times;</span>
        <img class="modal-content" id="modal-image">
    </div>
    <script>
        const apiUrl = "http://127.0.0.1:8008/api/memeforge/get_database";
        let images = [];
        function fetchDatabase() {
            fetch(apiUrl)
                .then(response => response.json())
                .then(response => {
                    if (response.status === 401) {
                        window.location.href = '{{site.baseurl}}/login';
                        return;
                    }
                    if (response.status === 403) {
                        window.location.href = '{{site.baseurl}}/403';
                        return;
                    }
                    images = JSON.parse(response).reverse();
                    displayImages(images);
                });
        }
        function displayImages(images) {
            const gallery = document.querySelector('.gallery');
            gallery.innerHTML = '';
            images.forEach((image, index) => {
                const galleryItemContainer = document.createElement('div');
                galleryItemContainer.className = 'gallery-item';
                const img = document.createElement('img');
                img.src = 'data:image/jpeg;base64,' + image.image;
                img.alt = image.name;
                img.addEventListener('click', () => {
                    openModal(image.image);
                });
                galleryItemContainer.appendChild(img);
                gallery.appendChild(galleryItemContainer);
            });
        }
        function openModal(imageData) {
            const modal = document.getElementById('modal');
            const modalImg = document.getElementById('modal-image');
            modal.style.display = 'block';
            modalImg.src = 'data:image/jpeg;base64,' + imageData;
            const close = document.getElementsByClassName('close')[0];
            close.onclick = function () {
                modal.style.display = 'none';
            };
        }
        fetchDatabase();
    </script>

</body>

