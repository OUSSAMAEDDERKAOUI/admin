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
