const axios = require("axios");
require("dotenv").config();

exports.handler = async (event, context) => {
  const optionBase = {
    method: "GET",
    url: "https://imdb8.p.rapidapi.com/title/get-top-rated-movies",
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
    },
  };

  const optionImages = {
    method: "GET",
    url: "https://imdb8.p.rapidapi.com/title/get-images",
    params: { tconst: "tt0944947", limit: "25" },
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
    },
  };

  try {
    const base = await axios
      .request(optionBase)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
    const urlSnippet = base[Math.floor(Math.random() * 150)].id.slice(7, -1);
    optionImages.params.tconst = urlSnippet;
    const data = await axios
      .request(optionImages)
      .then(function (response) {
        return response.data;
      })
      .then((response) => {
        const re = /(?<=(in ))(.*?)(?=( \())/;
        return {
          images: response.images,
          title: response.images[0].caption.match(re)[0],
        };
      })
      .catch(function (error) {
        console.error(error);
      });
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error }),
    };
  }
};
