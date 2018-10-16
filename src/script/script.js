console.log('coucou');
window.onload = function(){
    var selectedCategory;
    var selectElement = document.getElementById('nav-categories').options[document.getElementById('nav-categories').selectedIndex].text;
    var wrapper = document.getElementById('global-wrapper');

    function getSelectedElement(){
        var selectedCategory = selectElement.options[document.getElementById('nav-categories').selectedIndex].text;
    }

    selectElement.on('click', getSelectedElement);

    // Chargement du module
    var xhr= new XMLHttpRequest();
    xhr.open('GET', 'pages/quizz.html', true);
    xhr.onreadystatechange= function() {
        if (this.readyState!==4) return;
        if (this.status!==200) return; // or whatever error handling you want
        wrapper.innerHTML= this.responseText;
    };
    xhr.send();

};