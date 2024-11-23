const axios = require("axios");

exports.search = async (req, res) => {
  try {
    const query = req.query.q;
    const location = req.query.location || "Austin, Texas, United States";
    const hl = req.query.hl || "en";
    const gl = req.query.gl || "us";

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const apiKey = process.env.SERPAPI_API_KEY

    const url = `https://serpapi.com/search.json?q=${encodeURIComponent(
      query
    )}&location=${encodeURIComponent(location)}&hl=${hl}&gl=${gl}&google_domain=google.com&api_key=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch data from SerpAPI" });
  }
};

exports.searchImages = async (req, res) => {
  try {
    const query = req.query.q;
    const location = req.query.location || "Austin, TX, Texas, United States";
    const hl = req.query.hl || "en";
    const gl = req.query.gl || "us";

    if (!query) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const apiKey = process.env.SERPAPI_API_KEY;

    const url = `https://serpapi.com/search.json?engine=google_images&q=${encodeURIComponent(
      query
    )}&location=${encodeURIComponent(location)}&hl=${hl}&gl=${gl}&google_domain=google.com&api_key=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch data from SerpAPI" });
  }
};

exports.searchTracks = async (req, res) => {
  try {
    const query = req.query.q || "pop";
    const limit = req.query.limit || 10;

    const clientId = process.env.JAMENDO_API_KEY;
    const url = `https://api.jamendo.com/v3.0/tracks?client_id=${clientId}&format=json&limit=${limit}&search=${encodeURIComponent(
      query
    )}`;

    const response = await axios.get(url);
    const tracks = response.data.results.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artist_name,
      album: track.album_name,
      stream: track.audio,
    }));

    res.json({ tracks });
  } catch (error) {
    console.error("Error fetching tracks:", error.message);
    res.status(500).json({ error: "Failed to fetch music tracks." });
  }
}