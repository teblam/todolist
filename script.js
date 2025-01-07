// Initialisation du tableau pour stocker les tâches
let taches = [];

// Ajouter un nouveau tableau pour l'état des tâches
let tachesTerminees = [];

// Fonction pour créer l'en-tête du tableau
function creerStructureTableau() {
    const table = document.querySelector('table');
    
    // Vider la table et son parent des éléments précédents
    table.innerHTML = '';
    const existingTitre = document.querySelector('.liste-titre');
    if (existingTitre) {
        existingTitre.remove();
    }
    
    // Créer le titre "Liste des tâches"
    const titre = document.createElement('div');
    titre.textContent = 'Liste des tâches';
    titre.className = 'liste-titre';
    table.parentNode.insertBefore(titre, table);
    
    // Créer l'en-tête du tableau
    const thead = document.createElement('thead');
    const trHead = document.createElement('tr');
    
    const thCheck = document.createElement('th');
    thCheck.textContent = 'Terminée';
    thCheck.style.width = '80px';
    thCheck.style.textAlign = 'center';
    
    const thNum = document.createElement('th');
    thNum.textContent = 'Numéro';
    
    const thLib = document.createElement('th');
    thLib.textContent = 'Libellé';
    
    trHead.appendChild(thCheck);
    trHead.appendChild(thNum);
    trHead.appendChild(thLib);
    thead.appendChild(trHead);
    table.appendChild(thead);
    
    // Créer le corps du tableau
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

}

// Appeler la fonction au chargement de la page
document.addEventListener('DOMContentLoaded', creerStructureTableau);

// Fonction pour ajouter une tâche
function ajouterTache() {
    // Récupération de la valeur du champ de texte
    const description = document.getElementById('tacheInput').value;
    
    if (description.trim() !== '') {
        // Ajouter la tâche au tableau
        taches.push(description);
        tachesTerminees.push(false);
        
        // Mettre à jour l'affichage
        mettreAJourTableau();
        
        // Vider le champ de texte
        document.getElementById('tacheInput').value = '';
    }
}

// Fonction pour gérer le cochage des tâches
function cocherTache(event) {
    const checkbox = event.target;
    const index = parseInt(checkbox.getAttribute('data-index'));
    tachesTerminees[index] = checkbox.checked;
    
    const tousLesTD = document.querySelectorAll('td');
    const tdLibelle = tousLesTD[index * 3 + 2];
    const texte = taches[index];
    
    if (checkbox.checked) {
        tdLibelle.innerHTML = `<s>${texte}</s>`;
    } else {
        tdLibelle.innerHTML = texte;
    }
    
    console.log(`Tâche ${index + 1} ${checkbox.checked ? 'terminée' : 'non terminée'}`);
}

// Fonction pour mettre à jour l'affichage du tableau
function mettreAJourTableau() {
    const filtreSelect = document.getElementById('filtreSelect');
    filtrerTaches(filtreSelect.value);
}

// Fonction pour supprimer une tâche
function supprimerTache(index) {
    taches.splice(index, 1);
    mettreAJourTableau();
}

// Fonction pour filtrer les tâches
function filtrerTaches(filtre) {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = '';
    
    taches.forEach((tache, index) => {
        // Vérifier si la tâche doit être affichée selon le filtre
        let afficherTache = false;
        switch(filtre) {
            case 'completed':
                afficherTache = tachesTerminees[index];
                break;
            case 'uncompleted':
                afficherTache = !tachesTerminees[index];
                break;
            default: // 'all'
                afficherTache = true;
        }
        
        if (afficherTache) {
            const tr = document.createElement('tr');
            
            // Cellule pour la checkbox
            const tdCheck = document.createElement('td');
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = tachesTerminees[index];
            checkbox.setAttribute('data-index', index);
            checkbox.addEventListener('change', cocherTache);
            tdCheck.appendChild(checkbox);
            tdCheck.style.textAlign = 'center';
            
            // Cellule pour le numéro
            const tdNum = document.createElement('td');
            tdNum.textContent = index + 1;
            tdNum.style.width = '60px';
            tdNum.style.textAlign = 'center';
            
            // Cellule pour la description
            const tdDesc = document.createElement('td');
            tdDesc.innerHTML = tachesTerminees[index] ? `<s>${tache}</s>` : tache;
            
            tr.appendChild(tdCheck);
            tr.appendChild(tdNum);
            tr.appendChild(tdDesc);
            tbody.appendChild(tr);
        }
    });
}

// Ajouter l'écouteur d'événements pour le filtre
document.addEventListener('DOMContentLoaded', () => {
    creerStructureTableau();
    
    const filtreSelect = document.getElementById('filtreSelect');
    filtreSelect.addEventListener('change', (e) => {
        filtrerTaches(e.target.value);
    });
}); 