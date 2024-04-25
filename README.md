
Credit App Dashboard is a full-stack web application built with the MERN (MongoDB, React, and Node.js) stack.

Installation
Clone the repository.

Install the dependencies for both the client and server applications. cd mern-admin-dashboard/client && npm install cd ../server && npm install

Create a .env file in the server directory with the following variables. VITE_APP_BASE_URL= PORT= MONGO_URL= JWT_SECRET=

Start the server and client applications. cd ../server && yarn dev cd ../client && npm start

Navigate to http://localhost:5173 in your browser.

Technologies Used
MongoDB - NoSQL database used for storing data.
React - JavaScript library used for building the client-side application.
Node.js - JavaScript runtime used for building the server.
Redux - JavaScript library used for managing application state.
Material-UI - React component library used for styling.
Axios - Promise-based HTTP client used for making API requests.