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

const tubes = [
    {
        titre: "Never Gonna Give You Up",
        auteur: "Rick Astley",
        categorie: "Rick Roll",
        valeur: 1,
    },
    {
        titre: "Montaigne et la Boétie",
        auteur: "Claudia Phillips",
        categorie: 80,
        valeur: 3,
    },
    {
        titre: "Le bal masqué",
        auteur: "La Compagnie Créole",
        categorie: 80,
        valeur: 3,
    },
    {
        titre: "Tes états d'âme Éric",
        auteur: "Luna Parker",
        categorie: 80,
        valeur: 3,
    },
    {
        titre: "Les démons de minuit",
        auteur: "Émile et Images",
        categorie: 80,
        valeur: 3,
    },
    {
        titre: "Ohio",
        auteur: "Isabelle Adjani",
        categorie: 80,
        valeur: 3,
    },
    {
        titre: "Nuit de folie",
        auteur: "Début de soirée",
        categorie: 80,
        valeur: 3,
    },
    {
        titre: "Take On Me",
        auteur: "a-ha",
        categorie: 80,
        valeur: 3,
    },
    {
        titre: "Maniac",
        auteur: "Michael Sembello",
        categorie: 80,
        valeur: 3,
    },
    {
        titre: "Marcia Baila",
        auteur: "Les Rita Mitsouko",
        categorie: 80,
        valeur: 3,
    },
    {
        titre: "It's Raining Men",
        auteur: "The Weather Girls",
        categorie: 80,
        valeur: 3,
    },
    {
        titre: "Banana Split",
        auteur: "Lio",
        categorie: 80,
        valeur: 3,
    },
    {
        titre: "Boule de Flipper",
        auteur: "Corynne Charby",
        categorie: 80,
        valeur: 3,
    },
    {
        titre: "Everybody (Backstreet's Back)",
        auteur: "The Backstreet Boys",
        categorie: 90,
        valeur: 3,
    },
    {
        titre: "Oops!... I Did It Again",
        auteur: "Britney Spears",
        categorie: 90,
        valeur: 3,
    },
    {
        titre: "My Oh My",
        auteur: "Aqua",
        categorie: 90,
        valeur: 3,
    },
    {
        titre: "Mon papa à moi",
        auteur: "Stomy Bugsy",
        categorie: 90,
        valeur: 3,
    },
    {
        titre: "Partir un jour",
        auteur: "2be3",
        categorie: 90,
        valeur: 3,
    },
    {
        titre: "Believe",
        auteur: "Cher",
        categorie: 90,
        valeur: 3,
    },
    {
        titre: "Tu m'oublieras",
        auteur: "Larusso",
        categorie: 90,
        valeur: 3,
    },
    {
        titre: "Say My Name",
        auteur: "Destiny's Child",
        categorie: 90,
        valeur: 3,
    },
    {
        titre: "Pour que tu m'aimes encore",
        auteur: "Céline Dion",
        categorie: 90,
        valeur: 3,
    },
    {
        titre: "Tourne-toi",
        auteur: "Benoît",
        categorie: 2000,
        valeur: 3,
    },
    {
        titre: "Dragostea Din Tei",
        auteur: "O-Zone",
        categorie: 2000,
        valeur: 3,
    },
    {
        titre: "Les Sardines",
        auteur: "Patrick Sébastien",
        categorie: 2000,
        valeur: 3,
    },
    {
        titre: "Hey Oh",
        auteur: "Tragédie",
        categorie: 2000,
        valeur: 3,
    },
    {
        titre: "Lady Marmelade",
        auteur: ["Christina Aguilera", "Lil'Kim", "Mya", "Pink"],
        categorie: 2000,
        valeur: 3,
    },
    {
        titre: "Whenever Wherever",
        auteur: "Shakira",
        categorie: 2000,
        valeur: 3,
    },
    {
        titre: "I Kissed a Girl",
        auteur: "Katy Perry",
        categorie: 2000,
        valeur: 3,
    },
    {
        titre: "Girlfriend",
        auteur: "Avril Lavigne",
        categorie: 2000,
        valeur: 3,
    },
    {
        titre: "Candy Shop",
        auteur: "50 Cent",
        categorie: 2000,
        valeur: 3,
    },
    {
        titre: "Jenny From The Block",
        auteur: "Jennifer Lopez",
        categorie: 2000,
        valeur: 3,
    },
    {
        titre: "Parle à ma main",
        auteur: ["Fatal Bazooka", "Yelle"],
        categorie: 2000,
        valeur: 3,
    },
    {
        titre: "Asereje",
        auteur: "Las Ketchup",
        categorie: 2000,
        valeur: 3,
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