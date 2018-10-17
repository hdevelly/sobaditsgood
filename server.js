const http = require("http");
const fs = require('fs'); //filesystem
const url = require('url');

const users = [
    {
        username: 'toto',
        password: 'toto',
        score: 0
    },
    {
        username: 'tata',
        password: 'tata',
        score: 0
    }
];

const server = http.createServer();
server.listen(8080);
server.on('request', (requete, reponse) => {
    console.log(requete.url)
    function readStream(chemin){
        const readStream = fs.createReadStream(__dirname+chemin); //renvoie un stream
        readStream.on('data', data => reponse.write(data)); // on lit le fichier tant qu'il y a des données à lire
        readStream.on('end', () => reponse.end());
    }
    /*const parse = url.parse(requete.url, true); // parse l'url et en fait un JSON;
    parse.query;*/
    switch(requete.url) { // on récupère l'url
        case '/':
            readStream('/index.html');
        break;
        case '/pages/quizz.html':
            readStream('/pages/quizz.html');
        break;
        case '/pages/connection.html':
            readStream('/pages/connection.html');
        break;            
        default:
            if (fs.existsSync(__dirname + requete.url)) {
                readStream(requete.url);
            } else {
                reponse.statusCode = 404;
                reponse.end(); // Ce qu'on renvoie
            }
    }
});