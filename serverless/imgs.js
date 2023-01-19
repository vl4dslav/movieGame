const fetch = require("node-fetch");
require("dotenv").config();
// export "X-RapidAPI-Key" from   2    options
const urlBase =
  "https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&purchaseCountry=US&currentCountry=US";

// let urlImgs = `https://imdb8.p.rapidapi.com/title/get-images?tconst=tt10872600&limit=25`;

exports.handler = async (event, context) => {
  const optionsBase = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
    },
  };

  const optionsImgs = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.API_KEY,
      "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
    },
  };

  try {
    const base = await fetch(urlBase, optionsBase).then((response) =>
      response.json()
    );
    //   .then((response) => setBase(response))
    // .catch((err) => console.error(err));

    const urlSnippet = base[Math.floor(Math.random() * 100)].slice(7, -1);
    //   console.log(urlSnippet);
    const urlImgs = `https://imdb8.p.rapidapi.com/title/get-images?tconst=${urlSnippet}&limit=25`;
    //   console.log(urlImgs);
    const data = fetch(urlImgs, optionsImgs)
      .then((response) => response.json())
      .then((response) => {
        // setData(response.images);
        const re = /(?<=(in ))(.*?)(?=( \())/;
        // setTitle(response.images[0].caption.match(re)[0]); //here error ? why ?
        return {
          images: response.images,
          title: response.images[0].caption.match(re)[0],
        };
      });
    // .catch((err) => console.error(err));
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 422,
      body: err.stack,
    };
  }
};
