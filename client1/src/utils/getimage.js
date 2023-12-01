const axios = require('axios');
const fs = require('fs');

axios({
    method: 'get',
    url: 'http://192.168.99.100:8080/photo.jpg',
    responseType: 'stream',
})
    .then((response) => {
        response.data.pipe(fs.createWriteStream('photo.jpg'));
        response.data.on('end', () => console.log('Download complete.'));
    })
    .catch((error) => console.error('Error:', error));
