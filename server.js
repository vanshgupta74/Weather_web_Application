const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const port = 3000;

// Serve static frontend from 'public' folder
app.use(express.static("public"));

// API route to handle weather requests
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
 const apiKey = process.env.WEATHER_API_KEY;


  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`
    );
    res.json(response.data);
  } catch (error) {
    console.error("API error:", error.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
