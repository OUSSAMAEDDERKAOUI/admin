// Données de démonstration pour les matchs
const matches = [
    {
        id: 1,
        date: '2024-03-15T20:00:00',
        homeTeam: 'FC Local',
        awayTeam: 'AS Visiteur',
        location: 'Stade Municipal',
        status: 'scheduled',
        homeScore: null,
        awayScore: null
    },
    {
        id: 2,
        date: '2024-03-10T18:30:00',
        homeTeam: 'AS Visiteur',
        awayTeam: 'FC Local',
        location: 'Stade des Sports',
        status: 'completed',
        homeScore: 2,
        awayScore: 1
    },
    {
        id: 3,
        date: '2024-03-05T19:00:00',
        homeTeam: 'FC Local',
        awayTeam: 'US Adversaire',
        location: 'Stade Municipal',
        status: 'cancelled',
        homeScore: null,
        awayScore: null
    },
    {
        id: 4,
        date: '2024-03-12T20:00:00',
        homeTeam: 'FC Local',
        awayTeam: 'RC Rival',
        location: 'Stade Municipal',
        status: 'in_progress',
        homeScore: 1,
        awayScore: 1
    }
];

// Fonction pour obtenir le badge de statut
function getStatusBadge(status) {
    const badges = {
        scheduled: 'bg-blue-100 text-blue-800',
        in_progress: 'bg-yellow-100 text-yellow-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800'
    };
    const labels = {
        scheduled: 'Programmé',
        in_progress: 'En cours',
        completed: 'Terminé',
        cancelled: 'Annulé'
    };
    return `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badges[status]}">${labels[status]}</span>`;
}

// Fonction pour formater la date
function formatDateTime(dateString) {
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Fonction pour afficher le résultat
function getMatchResult(match) {
    if (match.status === 'completed' || match.status === 'in_progress') {
        return `${match.homeScore} - ${match.awayScore}`;
    }
    return '-';
}

// Fonction pour afficher le tableau des matchs
function renderMatchesTable() {
    const tbody = document.getElementById('matchesTableBody');
    tbody.innerHTML = matches.map(match => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${formatDateTime(match.date)}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                    ${match.homeTeam} vs ${match.awayTeam}
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${match.location}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${getStatusBadge(match.status)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${getMatchResult(match)}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-blue-600 hover:text-blue-900 mr-3" onclick="editMatch(${match.id})">Modifier</button>
                <button class="text-red-600 hover:text-red-900" onclick="deleteMatch(${match.id})">Supprimer</button>
            </td>
        </tr>
    `).join('');
}

// Fonctions pour la gestion des matchs
function editMatch(id) {
    // À implémenter : logique de modification d'un match
    console.log(`Modifier le match ${id}`);
}

function deleteMatch(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce match ?')) {
        const index = matches.findIndex(m => m.id === id);
        if (index !== -1) {
            matches.splice(index, 1);
            renderMatchesTable();
        }
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    renderMatchesTable();
});