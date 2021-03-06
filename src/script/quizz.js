var selectedCategory;
var selectedSongs;
const tubes = [
    {
        titre: "Ohio",
        auteur: "Isabelle Adjani",
        categorie: 80,
        path: "80AO",
        type: 'o'
    },
    {
        titre: "Take On Me",
        auteur: "a-ha",
        categorie: 80,
        path: "80AT",
        type: 'c'
    },
    {
        titre: "Maniac",
        auteur: "Michael Sembello",
        categorie: 80,
        path: "80SM",
        type: 'c'
    },
    {
        titre: "Boule de Flipper",
        auteur: "Corynne Charby",
        categorie: 80,
        path: "80CB",
        type: 'o'
    },
    {
        titre: "Oops!... I Did It Again",
        auteur: "Britney Spears",
        categorie: 90,
        path: "90SO",
        type: 'o'
    },
    {
        titre: "Mon papa à moi",
        auteur: "Stomy Bugsy",
        path: "90BM",
        categorie: 90,
        type: 'c'
    },
    {
        titre: "Partir un jour",
        auteur: "2be3",
        categorie: 90,
        path: "902P",
        type: 'c'
    },
    {
        titre: "Pour que tu m'aimes encore",
        auteur: "Céline Dion",
        categorie: 90,
        path: "90DP",
        type: 'o'
    },
    {
        titre: "Dragostea Din Tei",
        auteur: "O-Zone",
        categorie: 2000,
        path: "2000OD",
        type: 'c'
    },
    {
        titre: "Les Sardines",
        auteur: "Patrick Sébastien",
        categorie: 2000,
        path: "2000SL",
        type: 'c'
    },
    {
        titre: "Lady Marmelade",
        auteur: ["Christina Aguilera", "Lil'Kim", "Mya", "Pink"],
        categorie: 2000,
        path: "2000ML",
        type: 'o'
    },
    {
        titre: "I Kissed a Girl",
        auteur: "Katy Perry",
        categorie: 2000,
        path: "2000PI",
        type: 'o'
    }
];

window.onload = function(){

    function cleanText(text){
        let cleanedText = text.toLowerCase();
        cleanedText = cleanedText.replace(new RegExp(/[àáâ]/g),"a");
        cleanedText = cleanedText.replace(new RegExp(/[èéê]/g),"e");
        return cleanedText;
    }

    function getLumber(score){
        let lumberBlock = document.getElementById('lumber-end');
        let lumber = "score-lumber-";

        if (score >= 85) {
            lumber += "04";
        } else if (score >= 55) {
            lumber += "03";
        } else if (score >= 30) {
            lumber += "02";
        } else {
            lumber += "01";
        }
        
        lumberBlock.style.backgroundImage = "url('../src/img/lumbers/" + lumber + ".png')";
        lumberBlock.childNodes[1].textContent = "Score : " + score + "%";
        lumberBlock.classList.remove('hidden');
        lumberBlock.addEventListener('click', function(){
            lumberBlock.classList.add('hidden');
        });
    }

    function checkScore(){
        let answers = document.querySelectorAll('.answer');
        let total = answers.length;
        let score = 0;

        for(i=0; i < answers.length; i++){
            if(cleanText(answers[i].value) === cleanText(selectedSongs[i].titre)){
                score++;
            }
        }
        score = score*100/answers.length;
        console.log(score);
        getLumber(score);
    }

    function stopTune(){
        this.previousSibling.classList.add('hidden');
        let audio = this.nextSibling;
        audio.pause();
    }

    function playTune(){
        this.previousSibling.classList.remove('hidden');
        let audio = this.nextSibling;
        audio.currentTime = Math.random()*audio.duration;
        audio.play();
    }

    function buildVignettes(array){
        let vignettes = "";
        array.forEach(function(element){
            vignettes += "<div class='song'>";
            vignettes += "<img class='animal hidden' src='../src/img/icons/";
            vignettes += element.type ==='c' ? 'hamster' : 'bear';
            vignettes += "_song.png'/><img class='thumbnail secret' src='../src/img/singles/" + element.path + ".png'/>";
            vignettes += "<audio src='../src/sound/" + element.path + ".mp3'></audio>";
            vignettes += "<input type='text' class='answer'/></div>";
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
        selectedSongs = JSON.parse(JSON.stringify(tubes));
        let htmlNode = "";
        if(selectedCategory != 1){
            selectedSongs = filterArray(selectedSongs, {categorie : selectedCategory});
        }
        
        htmlNode =  buildVignettes(selectedSongs);
        document.getElementById('wrapper-quizz').innerHTML = htmlNode;

    }

    function getSelectedElement(){
        selectedCategory = document.getElementById('categories').options[document.getElementById('categories').selectedIndex].value;
    }
    
    //Écouteurs
    document.getElementById('categories').addEventListener('change', function(){
        document.getElementById('validate-quizz').classList.remove('masked');
        getSelectedElement();
        loadSongs();
        let nodes = document.querySelectorAll('.thumbnail');
        nodes.forEach(function(node){
            node.addEventListener('mouseenter', playTune);
            node.addEventListener('mouseleave', stopTune);
            node.addEventListener('touchenter', playTune);
            node.addEventListener('touchleave', stopTune);
        });
    });

    document.getElementById('validate-quizz').addEventListener('click', checkScore);
    
    document.getElementById('icon-help').addEventListener('click', function(){
        this.classList.add('hidden');
        document.getElementById('lumber-help').classList.remove('hidden');
    });

    document.getElementById('lumber-help').addEventListener('click', function(){
        this.classList.add('hidden');
        document.getElementById('icon-help').classList.remove('hidden');
    });


};