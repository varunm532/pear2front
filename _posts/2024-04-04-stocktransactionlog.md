---
title: Stocks Transaction Log
permalink: /transactionlog
layout: base
description: Varun's CPT Feature aspect of logging stock transactions.
---

<html>
    <h3>Transaction Log</h3>
    <a href="/teacher_portfolio/stocks">Back</a>
    <a href="/teacher_portfolio/portfolio">Portfolio</a>
    <head>
    <style>
        .darkmode {
            background: #252525;
            color: #ffffff;
        }
        .lightmode {
            background: #ffffff;
            color: #000000;
        }
        body {
            font-family: Arial, sans-serif;
            background-color: #222;
            margin: 0;
            padding: 0;
            display: block; /* Change to flex */
            justify-content: center;
            align-items: center;
            min-height: 100vh; /* Change to min-height */
        }
        .container {
            background-color: #333;
            border-radius: 8px;
            padding: 30px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            max-width: 100%; /* Change to max-width */
            overflow-x: auto; /* Allow horizontal scrolling */
        }
        h1 {
            text-align: center;
            margin-bottom: 20px;
            color: #fff;
            font-size: 20px;
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
            font-size: 10px;
        }
        button:hover {
            background-color: #454746;
        }
    </style>
        <link id="theme-style" rel="stylesheet" type="text/css" href="assets/css/style.css">
    </head>
    <body class="container">
        <table id="stockTable" >
        <thead>
            <tr>
                <th>User</th>
                <th>Symbol</th>
                <th>TransactionType</th>
                <th>Quantity</th>
                <th>TransactionAmount</th>
            </tr>
        </thead>
        <tbody>
            <!-- Table content will be dynamically populated using JavaScript -->
        </tbody>
        </table>
        <script type="module">
        import { uri, options1 } from '/teacher_portfolio/assets/js/api/config.js';
        let options = options1
    var darkMode = false;
    window.onload = function () {
        var themeStyle = document.getElementById('theme-style');
        var body = document.body;
        var storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'dark') {
            themeStyle.href = "assets/css/dark.css";
            body.classList.remove('lightmode');
            body.classList.add('darkmode');
        } else {
            themeStyle.href = "assets/css/style.css";
            body.classList.remove('darkmode');
            body.classList.add('lightmode');
        }
    }
    document.addEventListener("DOMContentLoaded", function () {
        function fetchData() {
            var url = 'http://127.0.0.1:8008/api/stocks/transaction/display'
            const uid = localStorage.getItem("uid");
            var data = {
                uid: uid
            }
            var json = JSON.stringify(data)
            //const authOptions = {
            //    method: 'POST',
            //    headers: { 'Content-Type': 'application/json' },
            //    body: json,
            //    credentials: 'include'
            //}
            const authOptions = {
                            ...options,
                            body:json,
                        };
            fetch(url, authOptions)
                .then(response => response.json())
                .then(data => {
                    updateTable(data);
                })
                .catch(error => console.error('Error fetching data:', error));
        }
        // Function to update the table with data
        function updateTable(data) {
            const tableBody = document.querySelector('#stockTable tbody');
            tableBody.innerHTML = ''; // Clear existing rows
            data.forEach(transaction => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${transaction.uid}</td>
                    <td>${transaction.symbol}</td>
                    <td>${transaction.transaction_type}</td>
                    <td>${transaction.quantity}</td>
                    <td>${transaction.transaction_amount}</td>
                `;
                tableBody.appendChild(row);
            });
        }
        // Call fetchData when the page loads
        fetchData();
    });
    </script>