var selectedCategory = "Toutes";
console.log("Je suis dans le quizz");

window.onload = function(){
    function getSelectedElement(){
        selectedCategory = document.getElementById('categories').options[document.getElementById('categories').selectedIndex].text;
        console.log(selectedCategory);
    }
    
    //Écouteurs
    document.getElementById('categories').addEventListener('click', getSelectedElement);
};