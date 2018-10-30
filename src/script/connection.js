window.onload = function(){
    let inscription = 0;

    function afficherFormulaire(statut){
        let formConnect = document.getElementById("form-connexion");
        let formSubscribe = document.getElementById("form-subscription");
        let btn = document.getElementById("subscribe");
        if (statut == 0) {
            formConnect.classList.remove('hidden');
            formSubscribe.classList.add('hidden');
            btn.innerHTML = "S'inscrire";
        } else {
            formConnect.classList.add('hidden');
            formSubscribe.classList.remove('hidden');
            btn.innerHTML = "Se connecter";
        }
    }

    document.getElementById("subscribe").addEventListener('click', function(){
        inscription == 0 ? inscription = 1 : inscription = 0;
        afficherFormulaire(inscription);
    });

    var xhr;
    xhr = new XMLHttpRequest();
    xhr.responseType="json";
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function(){
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                alert(xhr.responseText);
            }
            else{
                alert("there is a problem with the request");
            }
        }
    };
    xhr.open("POST", "/server.js");
    xhr.send("test");
};