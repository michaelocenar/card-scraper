const request = require('request');
const argv = process.argv;

const API_URL = 'https://api.thecatapi.com/v1';
const BREED_SEARCH_ENDPOINT = '/breeds/search';

if (argv.length < 3) {
  console.log('Usage: node app.js <breed name>');
  process.exit(1);
}

const breedName = argv[2];

const options = {
  url: `${API_URL}${BREED_SEARCH_ENDPOINT}?q=${breedName}`,
  headers: {
    'x-api-key': process.env.CAT_API_KEY
  }
};

request(options, function (error, response, body) {
  if (error) {
    console.error(error);
    process.exit(1);
  }

  const data = JSON.parse(body);

  if (data.length === 0) {
    console.log(`Breed "${breedName}" not found`);
  } else {
    console.log(`Breed description: ${data[0].description}`);
    // console.log(`Breed ID: ${data[0].id}`);
    // console.log(`Breed Name: ${data[0].name}`);
  }
});
