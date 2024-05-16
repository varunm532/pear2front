---
permalink: /login
title: Login
layout: base
description: This is our Login system.
---

<html lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
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
        input[type="password"] {
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
    <div class="container">
        <h1>Login</h1>
        <form>
            <label for="name">Username:</label>
            <input type="text" id="name" required>
            <label for="uid">User ID:</label>
            <input type="text" id="uid" required>
            <label for="password">Password:</label>
            <input type="password" id="password" required>
            <button type="button" onclick="sign_in()">Login</button>
        </form>
    </div>
    <script>
        window.sign_in = function signin(){
            const authurl = 'http://127.0.0.1:8008/api/users/authenticate';
            const body = {
                name: document.getElementById('name').value,
                uid: document.getElementById('uid').value,
                password: document.getElementById('password').value
            };
            const authOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
                cache: 'no-cache',
                credentials: 'include'
            };
            fetch(authurl, authOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert("User Does Not Exist");
            })
            .catch(err => {
                console.error(err);
                alert("User Authenticated Successfully");
                window.localStorage.setItem('uid', document.getElementById('uid').value);
                window.localStorage.setItem('name', document.getElementById('name').value);
                console.log("UID and Name Stored Successfully");
                if (document.getElementById('uid').value === 'admin' || document.getElementById('uid').value === 'Admin') {
                    window.location.href = "/AtlasIndex/display";
                    return;
                } else {
                    window.location.href = "/teacher_portfolio/blogs/";
                }             
            });
        }
    </script>
</html>
