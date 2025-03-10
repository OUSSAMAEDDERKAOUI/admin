// Données de démonstration pour les sanctions
const sanctions = [
    {
        id: 1,
        playerName: 'Thomas Dubois',
        type: 'suspension',
        startDate: '2024-03-01',
        endDate: '2024-03-15',
        reason: 'Carton rouge - Comportement antisportif',
        status: 'active',
        details: '2 matchs de suspension'
    },
    {
        id: 2,
        playerName: 'Lucas Martin',
        type: 'warning',
        startDate: '2024-02-28',
        endDate: '2024-02-28',
        reason: 'Accumulation de cartons jaunes',
        status: 'completed',
        details: 'Avertissement officiel'
    },
    {
        id: 3,
        playerName: 'Hugo Bernard',
        type: 'fine',
        startDate: '2024-03-05',
        endDate: '2024-03-05',
        reason: 'Retard répété aux entraînements',
        status: 'active',
        details: 'Amende de 100€'
    },
    {
        id: 4,
        playerName: 'Antoine Dupont',
        type: 'suspension',
        startDate: '2024-02-20',
        endDate: '2024-03-20',
        reason: 'Comportement violent',
        status: 'active',
        details: '3 matchs de suspension'
    },
    {
        id: 5,
        playerName: 'Maxime Petit',
        type: 'warning',
        startDate: '2024-03-02',
        endDate: '2024-03-02',
        reason: 'Non-respect des consignes',
        status: 'completed',
        details: 'Avertissement verbal'
    }
];

// Fonction pour obtenir le badge de type de sanction
function getSanctionTypeBadge(type) {
    const badges = {
        suspension: 'bg-red-100 text-red-800',
        warning: 'bg-yellow-100 text-yellow-800',
        fine: 'bg-orange-100 text-orange-800'
    };
    const labels = {
        suspension: 'Suspension',
        warning: 'Avertissement',
        fine: 'Amende'
    };
    return `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badges[type]}">${labels[type]}</span>`;
}

// Fonction pour obtenir le badge de statut
function getStatusBadge(status) {
    const badges = {
        active: 'bg-red-100 text-red-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-gray-100 text-gray-800'
    };
    const labels = {
        active: 'En cours',
        completed: 'Terminée',
        cancelled: 'Annulée'
    };
    return `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badges[status]}">${labels[status]}</span>`;
}

// Fonction pour formater la date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Fonction pour afficher la période
function formatPeriod(startDate, endDate) {
    if (startDate === endDate) {
        return formatDate(startDate);
    }
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

// Fonction pour afficher le tableau des sanctions
function renderSanctionsTable() {
    const tbody = document.getElementById('sanctionsTableBody');
    tbody.innerHTML = sanctions.map(sanction => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${sanction.playerName}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${getSanctionTypeBadge(sanction.type)}
                <div class="text-xs text-gray-500 mt-1">${sanction.details}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${formatPeriod(sanction.startDate, sanction.endDate)}</div>
            </td>
            <td class="px-6 py-4">
                <div class="text-sm text-gray-900">${sanction.reason}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${getStatusBadge(sanction.status)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-indigo-600 hover:text-indigo-900 mr-3" onclick="viewSanctionDetails(${sanction.id})">Voir détails</button>
   
            </td>
        </tr>
    `).join('');
}

// Fonctions pour la gestion des sanctions
function viewSanctionDetails(id) {
    const sanction = sanctions.find(s => s.id === id);
    if (sanction) {
        alert(`Détails de la sanction de ${sanction.playerName}:\n\nType: ${sanction.type}\nPériode: ${formatPeriod(sanction.startDate, sanction.endDate)}\nRaison: ${sanction.reason}\nDétails: ${sanction.details}`);
    }
}

function editSanction(id) {
    // À implémenter : logique de modification d'une sanction
    console.log(`Modifier la sanction ${id}`);
}

function deleteSanction(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette sanction ?')) {
        const index = sanctions.findIndex(s => s.id === id);
        if (index !== -1) {
            sanctions.splice(index, 1);
            renderSanctionsTable();
        }
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    renderSanctionsTable();
});