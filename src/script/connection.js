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
};