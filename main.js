// Données de démonstration
const players = [
    {
        id: 1,
        firstName: 'Thomas',
        lastName: 'Dubois',
        position: 'Attaquant',
        status: 'active',
        lastActivity: '2024-03-10',
        jerseyNumber: 10
    },
    {
        id: 2,
        firstName: 'Lucas',
        lastName: 'Martin',
        position: 'Défenseur',
        status: 'injured',
        lastActivity: '2024-03-08',
        jerseyNumber: 4
    },
    {
        id: 3,
        firstName: 'Hugo',
        lastName: 'Bernard',
        position: 'Gardien',
        status: 'suspended',
        lastActivity: '2024-03-05',
        jerseyNumber: 1
    }
];

// Fonctions utilitaires
function getStatusBadge(status) {
    const badges = {
        active: 'bg-green-100 text-green-800',
        injured: 'bg-red-100 text-red-800',
        suspended: 'bg-yellow-100 text-yellow-800'
    };
    const labels = {
        active: 'Actif',
        injured: 'Blessé',
        suspended: 'Suspendu'
    };
    return `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${badges[status]}">${labels[status]}</span>`;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Gestion du tableau des joueurs
function renderPlayersTable() {
    const tbody = document.getElementById('playersTableBody');
    tbody.innerHTML = players.map(player => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center">
                        ${player.jerseyNumber}
                    </div>
                    <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                            ${player.firstName} ${player.lastName}
                        </div>
                    </div>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${player.position}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                ${getStatusBadge(player.status)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                ${formatDate(player.lastActivity)}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-blue-600 hover:text-blue-900 mr-3" onclick="editPlayer(${player.id})">Modifier</button>
                <button class="text-red-600 hover:text-red-900" onclick="deletePlayer(${player.id})">Supprimer</button>
            </td>
        </tr>
    `).join('');
}

// Gestion du modal
const modal = document.getElementById('playerModal');
const btnAddPlayer = document.getElementById('btnAddPlayer');
const closeModal = document.getElementById('closeModal');
const cancelButton = document.getElementById('cancelButton');
const playerForm = document.getElementById('playerForm');

function showModal(title = 'Ajouter un Joueur') {
    document.getElementById('modalTitle').textContent = title;
    modal.classList.remove('hidden');
}

function hideModal() {
    modal.classList.add('hidden');
    playerForm.reset();
}

btnAddPlayer.addEventListener('click', () => showModal());
closeModal.addEventListener('click', hideModal);
cancelButton.addEventListener('click', hideModal);

// Gestion du formulaire
playerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(playerForm);
    const playerData = Object.fromEntries(formData.entries());
    
    // Ajouter le nouveau joueur aux données
    players.push({
        id: players.length + 1,
        ...playerData,
        lastActivity: new Date().toISOString().split('T')[0]
    });

    // Mettre à jour l'affichage et fermer le modal
    renderPlayersTable();
    hideModal();
});

// Fonctions d'édition et de suppression
function editPlayer(id) {
    const player = players.find(p => p.id === id);
    if (player) {
        showModal('Modifier le Joueur');
        // Remplir le formulaire avec les données du joueur
        Object.entries(player).forEach(([key, value]) => {
            const input = playerForm.elements[key];
            if (input) {
                input.value = value;
            }
        });
    }
}

function deletePlayer(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce joueur ?')) {
        const index = players.findIndex(p => p.id === id);
        if (index !== -1) {
            players.splice(index, 1);
            renderPlayersTable();
        }
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    renderPlayersTable();
});