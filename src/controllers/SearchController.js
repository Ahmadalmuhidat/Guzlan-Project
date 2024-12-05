const axios = require("axios");
const SpotifyWebApi = require('spotify-web-api-node');



async function getSpotifyToken() {
  try {
    const clientId = '557033fd59ff435db40f9cdc5d6fa646';
    const clientSecret = '11de02289a64434195c5daa02419cb4f';

    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
      },
    });

  
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Spotify token:', error.response?.data || error.message);
    throw error;
  }
}




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
    console.log(response.data);
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
    const token = await getSpotifyToken()
    var spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(token);
    var songs = spotifyApi.searchTracks(query);
    songs.then(function(data){
      res.json({data : data.body.tracks.items});
    })
  } catch (error) {
    console.error("Error fetching tracks:", error.message);
    res.status(500).json({ error: "Failed to fetch music tracks." });
  }
};
