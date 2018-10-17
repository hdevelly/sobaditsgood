var selectedCategory;

const tubes = [
    {
        titre: "Ohio",
        auteur: "Isabelle Adjani",
        categorie: 80,
        songPath: "lwrAdjOhi",
        imgPath: "80AO",
        valeur: 3
    },
    {
        titre: "Take On Me",
        auteur: "a-ha",
        categorie: 80,
        songPath: "uprAhaTak",
        imgPath: "80AT",
        valeur: 3
    },
    {
        titre: "Maniac",
        auteur: "Michael Sembello",
        categorie: 80,
        songPath: "uprSemMan",
        imgPath: "80SM",
        valeur: 3
    },
    {
        titre: "Boule de Flipper",
        auteur: "Corynne Charby",
        categorie: 80,
        songPath: "lwrChaBou",
        imgPath: "80CB",
        valeur: 3
    },
    {
        titre: "Oops!... I Did It Again",
        auteur: "Britney Spears",
        categorie: 90,
        songPath: "lwrSpeOop",
        imgPath: "90SO",
        valeur: 3
    },
    {
        titre: "Mon papa à moi",
        auteur: "Stomy Bugsy",
        songPath: "uprBugMon",
        imgPath: "90BM",
        categorie: 90,
        valeur: 3
    },
    {
        titre: "Partir un jour",
        auteur: "2be3",
        categorie: 90,
        songPath: "upr2bePar",
        imgPath: "902P",
        valeur: 3
    },
    {
        titre: "Pour que tu m'aimes encore",
        auteur: "Céline Dion",
        categorie: 90,
        songPath: "lwrDioPou",
        imgPath: "90DP",
        valeur: 3
    },
    {
        titre: "Dragostea Din Tei",
        auteur: "O-Zone",
        categorie: 2000,
        songPath: "uprOzoDra",
        imgPath: "2000OD",
        valeur: 3
    },
    {
        titre: "Les Sardines",
        auteur: "Patrick Sébastien",
        categorie: 2000,
        songPath: "uprSebLes",
        imgPath: "2000SL",
        valeur: 3
    },
    {
        titre: "Lady Marmelade",
        auteur: ["Christina Aguilera", "Lil'Kim", "Mya", "Pink"],
        categorie: 2000,
        songPath: "lwrMouLad",
        imgPath: "2000ML",
        valeur: 3
    },
    {
        titre: "I Kissed a Girl",
        auteur: "Katy Perry",
        categorie: 2000,
        songPath: "lwrPerIki",
        imgPath:'lwrPerIki',
        imgPath: "2000PI",
        valeur: 3
    }
];

console.log("Je suis dans le quizz");

window.onload = function(){

    function buildVignettes(array){
        let vignettes = "";
        array.forEach(function(element){
            vignettes += "<div class='song'><img class='thumbnail secret' src='../src/img/" + element.imgPath + ".png'/><input type='text' class='answer'/></div>";
        });
        return vignettes;
    }

    function filterArray(array, category){
        return array.filter(function(obj) {
            return Object.keys(category).every(function(c) {
              return obj[c] == category[c];
            });
        });
    }

    function loadSongs(){
        let songsArray = JSON.stringify(tubes);
        let htmlNode = "";
        if(selectedCategory != 1){
            songsArray = filterArray(JSON.parse(songsArray), {categorie : selectedCategory});
        }
        
        htmlNode =  buildVignettes(songsArray);

        console.log(htmlNode);

    }

    function getSelectedElement(){
        selectedCategory = document.getElementById('categories').options[document.getElementById('categories').selectedIndex].value;
    }
    
    //Écouteurs
    document.getElementById('categories').addEventListener('change', function(){
        getSelectedElement();
        loadSongs();
    });

};