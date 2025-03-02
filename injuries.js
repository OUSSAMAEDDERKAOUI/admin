// Données de démonstration pour les blessures
const injuries = [
    {
        id: 1,
        playerName: 'Thomas Dubois',
        injuryType: 'Musculaire',
        injuryDate: '2024-03-01',
        estimatedDuration: '3 semaines',
        status: 'recovering',
        details: 'Élongation des ischio-jambiers'
    },
    {
        id: 2,
        playerName: 'Lucas Martin',
        injuryType: 'Fracture',
        injuryDate: '2024-02-15',
        estimatedDuration: '6 semaines',
        status: 'unavailable',
        details: 'Fracture du métatarse'
    },
    {
        id: 3,
        playerName: 'Hugo Bernard',
        injuryType: 'Ligament',
        injuryDate: '2024-02-28',
        estimatedDuration: '4 semaines',
        status: 'recovering',
        details: 'Entorse de la cheville'
    },
    {
        id: 4,
        playerName: 'Antoine Dupont',
        injuryType: 'Musculaire',
        injuryDate: '2024-03-05',
        estimatedDuration: '2 semaines',
        status: 'recovering',
        details: 'Contracture quadriceps'
    },
    {
        id: 5,
        playerName: 'Maxime Petit',
        injuryType: 'Autre',
        injuryDate: '2024-02-20',
        estimatedDuration: '1 semaine',
        status: 'returned',
        details: 'Contusion genou'
    }
];

// Fonction pour obtenir le badge de statut
function getStatusBadge(status) {
    const badges = {
        recovering: 'bg-yellow-100 text-yellow-800',
        unavailable: 'bg-red-100 text-red-800',
        returned: 'bg-green-100 text-green-800'
    };
    const labels = {
        recovering: 'En récupération',
        unavailable: 'Indisponible',
        returned: 'De retour'
    };
    return `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badges[status]}">${labels[status]}</span>`;
}

// Fonction pour formater la date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Fonction pour afficher le tableau des blessures
function renderInjuriesTable() {
    const tbody = document.getElementById('injuriesTableBody');
    tbody.innerHTML = injuries.map(injury => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${injury.playerName}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${injury.injuryType}</div>
                <div class="text-xs text-gray-500">${injury.details}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${formatDate(injury.injuryDate)}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${injury.estimatedDuration}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${getStatusBadge(injury.status)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-indigo-600 hover:text-indigo-900 mr-3" onclick="viewInjuryDetails(${injury.id})">Voir détails</button>
                <button class="text-blue-600 hover:text-blue-900 mr-3" onclick="editInjury(${injury.id})">Modifier</button>
                <button class="text-red-600 hover:text-red-900" onclick="deleteInjury(${injury.id})">Supprimer</button>
            </td>
        </tr>
    `).join('');
}

// Fonctions pour la gestion des blessures
function viewInjuryDetails(id) {
    const injury = injuries.find(i => i.id === id);
    if (injury) {
        alert(`Détails de la blessure de ${injury.playerName}:\n\nType: ${injury.injuryType}\nDate: ${formatDate(injury.injuryDate)}\nDurée estimée: ${injury.estimatedDuration}\nDétails: ${injury.details}`);
    }
}

function editInjury(id) {
    // À implémenter : logique de modification d'une blessure
    console.log(`Modifier la blessure ${id}`);
}

function deleteInjury(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette blessure ?')) {
        const index = injuries.findIndex(i => i.id === id);
        if (index !== -1) {
            injuries.splice(index, 1);
            renderInjuriesTable();
        }
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    renderInjuriesTable();
});