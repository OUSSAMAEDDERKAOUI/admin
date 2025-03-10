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
        injuries: [
            {
                id: 1,
                player: 'Mohammed Alami',
                team: 'AS FAR',
                type: 'Musculaire',
                date: '2025-03-01',
                expectedDuration: '3 semaines',
                status: 'En traitement',
                description: 'Élongation des ischio-jambiers',
                doctor: 'Dr. Hassan El Fassi',
                treatments: [
                    { date: '2025-03-01', description: 'Diagnostic initial et repos' },
                    { date: '2025-03-05', description: 'Début de la physiothérapie' }
                ]
            },
            {
                id: 2,
                player: 'Karim Benjelloun',
                team: 'Wydad Athletic Club',
                type: 'Articulaire',
                date: '2025-02-28',
                expectedDuration: '6 semaines',
                status: 'En rééducation',
                description: 'Entorse de la cheville',
                doctor: 'Dr. Fatima Zahra',
                treatments: [
                    { date: '2025-02-28', description: 'Immobilisation et glace' },
                    { date: '2025-03-07', description: 'Début de la rééducation' }
                ]
            },
            {
                id: 3,
                player: 'Youssef El Amrani',
                team: 'Raja Club Athletic',
                type: 'Osseuse',
                date: '2025-03-03',
                expectedDuration: '2 mois',
                status: 'En traitement',
                description: 'Fracture du métatarse',
                doctor: 'Dr. Ahmed Benani',
                treatments: [
                    { date: '2025-03-03', description: 'Pose du plâtre' },
                    { date: '2025-03-08', description: 'Contrôle radiologique' }
                ]
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

    // Display Injuries
    function displayInjuries() {
        const tbody = document.getElementById('injuriesTableBody');
        tbody.innerHTML = mockData.injuries.map(injury => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">
                    <div class="font-medium">${injury.player}</div>
                </td>
                <td class="px-6 py-4">${injury.team}</td>
                <td class="px-6 py-4">${injury.type}</td>
                <td class="px-6 py-4">${injury.date}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold ${
                        injury.status === 'En traitement' ? 'bg-yellow-100 text-yellow-800' :
                        injury.status === 'En rééducation' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                    }">${injury.status}</span>
                </td>
                <td class="px-6 py-4 text-right">
                    <button onclick="showInjuryDetails(${injury.id})" 
                            class="text-blue-600 hover:text-blue-800">
                        Voir détails
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Show Injury Details
    window.showInjuryDetails = function(injuryId) {
        const injury = mockData.injuries.find(i => i.id === injuryId);
        if (!injury) return;

        const modal = document.getElementById('injuryModal');
        const content = document.getElementById('injuryModalContent');
        
        content.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-4">
                    <div>
                        <h4 class="font-semibold text-gray-700">Informations du Joueur</h4>
                        <p><strong>Nom:</strong> ${injury.player}</p>
                        <p><strong>Équipe:</strong> ${injury.team}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-700">Détails de la Blessure</h4>
                        <p><strong>Type:</strong> ${injury.type}</p>
                        <p><strong>Description:</strong> ${injury.description}</p>
                        <p><strong>Date:</strong> ${injury.date}</p>
                        <p><strong>Durée estimée:</strong> ${injury.expectedDuration}</p>
                        <p><strong>Médecin:</strong> ${injury.doctor}</p>
                    </div>
                </div>
                <div>
                    <h4 class="font-semibold text-gray-700 mb-2">Suivi des Traitements</h4>
                    <div class="space-y-2">
                        ${injury.treatments.map(treatment => `
                            <div class="p-2 bg-gray-50 rounded">
                                <p class="text-sm font-medium">${treatment.date}</p>
                                <p class="text-sm text-gray-600">${treatment.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
    };

    // Close Modal
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('injuryModal').classList.add('hidden');
        });
    });

    // Initialize
    populateTeamFilter();
    displayInjuries();

    // Filter Handlers
    document.getElementById('teamFilter').addEventListener('change', displayInjuries);
    document.getElementById('injuryTypeFilter').addEventListener('change', displayInjuries);
    document.getElementById('statusFilter').addEventListener('change', displayInjuries);
});
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
