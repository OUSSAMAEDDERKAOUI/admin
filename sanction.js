document.addEventListener('DOMContentLoaded', function() {
    // Mock Data
    const mockData = {
        teams: [
            { id: 1, name: 'AS FAR' },
            { id: 2, name: 'Wydad Athletic Club' },
            { id: 3, name: 'Raja Club Athletic' },
            { id: 4, name: 'Renaissance de Berkane' },
            { id: 5, name: 'FUS de Rabat' }
        ],
        sanctions: [
            {
                id: 1,
                player: 'Rachid Benali',
                team: 'Raja Club Athletic',
                type: 'Carton Rouge',
                date: '2025-03-05',
                duration: '3 matchs',
                status: 'En cours',
                reason: 'Tacle dangereux',
                match: 'RCA vs WAC',
                referee: 'Mohamed El Harti',
                details: 'Tacle par derrière à la 75ème minute',
                matchesSuspended: [
                    { date: '2025-03-12', match: 'RCA vs FUS' },
                    { date: '2025-03-19', match: 'RSB vs RCA' },
                    { date: '2025-03-26', match: 'RCA vs ASF' }
                ]
            },
            {
                id: 2,
                player: 'Karim Benjelloun',
                team: 'AS FAR',
                type: 'Carton Jaune',
                date: '2025-03-08',
                duration: '1 match',
                status: 'En cours',
                reason: 'Cumul de cartons',
                match: 'ASF vs RSB',
                referee: 'Hassan El Jaouhari',
                details: 'Troisième carton jaune de la saison',
                matchesSuspended: [
                    { date: '2025-03-15', match: 'WAC vs ASF' }
                ]
            },
            {
                id: 3,
                player: 'Omar Saidi',
                team: 'Wydad Athletic Club',
                type: 'Avertissement',
                date: '2025-03-07',
                duration: '-',
                status: 'Terminée',
                reason: 'Comportement antisportif',
                match: 'WAC vs FUS',
                referee: 'Noureddine El Jaafari',
                details: 'Contestation des décisions arbitrales',
                matchesSuspended: []
            }
        ]
    };

    // Populate Team Filter
    function populateTeamFilter() {
        const teamFilter = document.getElementById('teamFilter');
        teamFilter.innerHTML = '<option value="all">Toutes les équipes</option>';
        mockData.teams.forEach(team => {
            teamFilter.innerHTML += `<option value="${team.id}">${team.name}</option>`;
        });
    }

    // Display Sanctions
    function displaySanctions() {
        const tbody = document.getElementById('sanctionsTableBody');
        tbody.innerHTML = mockData.sanctions.map(sanction => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">
                    <div class="font-medium">${sanction.player}</div>
                </td>
                <td class="px-6 py-4">${sanction.team}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold ${
                        sanction.type === 'Carton Rouge' ? 'bg-red-100 text-red-800' :
                        sanction.type === 'Carton Jaune' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                    }">${sanction.type}</span>
                </td>
                <td class="px-6 py-4">${sanction.date}</td>
                <td class="px-6 py-4">${sanction.duration}</td>
                <td class="px-6 py-4 text-right">
                    <button onclick="showSanctionDetails(${sanction.id})" 
                            class="text-blue-600 hover:text-blue-800">
                        Voir détails
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Show Sanction Details
    window.showSanctionDetails = function(sanctionId) {
        const sanction = mockData.sanctions.find(s => s.id === sanctionId);
        if (!sanction) return;

        const modal = document.getElementById('sanctionModal');
        const content = document.getElementById('sanctionModalContent');
        
        content.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-4">
                    <div>
                        <h4 class="font-semibold text-gray-700">Informations du Joueur</h4>
                        <p><strong>Nom:</strong> ${sanction.player}</p>
                        <p><strong>Équipe:</strong> ${sanction.team}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-700">Détails de la Sanction</h4>
                        <p><strong>Type:</strong> ${sanction.type}</p>
                        <p><strong>Raison:</strong> ${sanction.reason}</p>
                        <p><strong>Match:</strong> ${sanction.match}</p>
                        <p><strong>Arbitre:</strong> ${sanction.referee}</p>
                        <p><strong>Détails:</strong> ${sanction.details}</p>
                    </div>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-700 mb-2">Matchs de Suspension</h4>
                    ${sanction.matchesSuspended.length > 0 ? `
                        <div class="space-y-2">
                            ${sanction.matchesSuspended.map(match => `
                                <div class="p-2 bg-gray-50 rounded">
                                    <p class="text-sm font-medium">${match.date}</p>
                                    <p class="text-sm text-gray-600">${match.match}</p>
                                </div>
                            `).join('')}
                        </div>
                    ` : '<p class="text-gray-500">Aucun match de suspension</p>'}
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
    };

    // Close Modal
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('sanctionModal').classList.add('hidden');
        });
    });

    // Initialize
    populateTeamFilter();
    displaySanctions();

    // Filter Handlers
    document.getElementById('teamFilter').addEventListener('change', displaySanctions);
    document.getElementById('sanctionTypeFilter').addEventListener('change', displaySanctions);
    document.getElementById('statusFilter').addEventListener('change', displaySanctions);
});
