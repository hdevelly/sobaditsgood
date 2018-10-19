const http = require("http");
const fs = require('fs'); //filesystem
const url = require('url');
const { parse } = require('querystring');
const { Server } = require('ws');

const server = http.createServer();
server.listen(8080);
server.on('request', (requete, reponse) => {
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
    switch(requete.url) { // on récupère l'url
        case '/':
            readStream('/index.html');
        break;
        case '/pages/quizz.html':
            readStream('/pages/quizz.html');
        break;
        case '/pages/connection.html':
            readStream('/pages/connection.html');
            if (requete.method === 'POST') {
                var body='';
                requete.on('data', form =>{
                    body+=form.toString();
                });
                requete.on('end', () =>{
                    users.push({username:parse(body)["username"], password:parse(body)["password"], score:0});
                    //console.log(parse(body)["username"]);
                    console.log(users);
                });
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