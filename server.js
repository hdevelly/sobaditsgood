const http = require("http");
const fs = require('fs'); //filesystem
const url = require('url');
const { parse } = require('querystring');
const { Server } = require('ws');

const httpserver = http.createServer();
const wss = new Server({ server: httpserver });

var users = [
    {
        "username": "toto",
        "password": "toto",
        "score": 0
    },
    {
        "username": "tata",
        "password": "tata",
        "score": 0
    }
];


httpserver.listen(8080);
httpserver.on('request', (requete, reponse) => {
    const urlParses = url.parse(requete.url);

    function readStream(chemin){
        const readStream = fs.createReadStream(__dirname+chemin); //renvoie un stream
        readStream.on('data', data => reponse.write(data)); // on lit le fichier tant qu'il y a des données à lire
        readStream.on('end', () => reponse.end());
    }
    /*for(var i=0;i<users.length;i++){
        const parse = url.parse(requete.url, true);
        parse.query;
        if(parse.query["username"] === users[i]["username"] && parse.query["password"] === users[i]["password"]){
            console.log("okk let's go");
            break;
        }
        else{
            console.log("try again");
        }
    }*/
    switch(urlParses.pathname) { // on récupère l'url
        case '/':
            readStream('/index.html');
        break;
        case '/pages/quizz.html':
            readStream('/pages/quizz.html');
        break;
        case '/pages/connection.html':
            if (requete.method === 'POST') {
                var body='';
                requete.on('data', form =>{
                    body+=form.toString();
                });
                requete.on('end', () =>{
                    const bodyParsed = parse(body);
                    users.push({ username: bodyParsed.username, password: bodyParsed.password, score: 0 });
                    //console.log(parse(body)["username"]);
                    console.log(users);

                    reponse.end(JSON.stringify({ username: bodyParsed.username }));
                });
            } else {
                readStream('/pages/connection.html');
            }
        break;
        case '/pages/leaderboard.html':
            readStream('/pages/leaderboard.html');
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