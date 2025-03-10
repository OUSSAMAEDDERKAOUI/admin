document.addEventListener('DOMContentLoaded', function() {
    // Fake Data
    const mockData = {
        teams: [
            { id: 1, name: 'AS FAR' },
            { id: 2, name: 'Wydad Athletic Club' },
            { id: 3, name: 'Raja Club Athletic' },
            { id: 4, name: 'Renaissance de Berkane' },
            { id: 5, name: 'FUS de Rabat' }
        ],
        playerLists: [
            {
                id: 1,
                team: 'AS FAR',
                submissionDate: '2025-03-08',
                playerCount: 25,
                status: 'En attente',
                players: [
                    { name: 'Mohammed Alami', position: 'Attaquant', number: '9', status: 'Actif' },
                    { name: 'Karim Benjelloun', position: 'Milieu', number: '8', status: 'Actif' },
                    { name: 'Youssef El Amrani', position: 'Défenseur', number: '4', status: 'Actif' }
                ]
            },
            {
                id: 2,
                team: 'Wydad Athletic Club',
                submissionDate: '2025-03-07',
                playerCount: 23,
                status: 'Validé',
                players: [
                    { name: 'Ahmed Tazi', position: 'Gardien', number: '1', status: 'Actif' },
                    { name: 'Omar Saidi', position: 'Défenseur', number: '5', status: 'Actif' }
                ]
            },
            {
                id: 3,
                team: 'Raja Club Athletic',
                submissionDate: '2025-03-09',
                playerCount: 24,
                status: 'Rejeté',
                players: [
                    { name: 'Hamid El Fassi', position: 'Attaquant', number: '11', status: 'Blessé' },
                    { name: 'Rachid Benali', position: 'Milieu', number: '6', status: 'Suspendu' }
                ]
            }
        ],
        injuries: [
            { player: 'Hamid El Fassi', team: 'Raja Club Athletic', type: 'Musculaire', duration: '2 semaines', status: 'En traitement' },
            { player: 'Mohammed Alami', team: 'AS FAR', type: 'Genou', duration: '1 mois', status: 'En rééducation' },
            { player: 'Ahmed Tazi', team: 'Wydad Athletic Club', type: 'Cheville', duration: '3 semaines', status: 'En traitement' }
        ],
        sanctions: [
            { player: 'Rachid Benali', team: 'Raja Club Athletic', type: 'Carton Rouge', duration: '3 matchs', date: '2025-03-05' },
            { player: 'Karim Benjelloun', team: 'AS FAR', type: 'Carton Jaune', duration: '1 match', date: '2025-03-08' },
            { player: 'Omar Saidi', team: 'Wydad Athletic Club', type: 'Avertissement', duration: '-', date: '2025-03-07' }
        ],
        matches: [
            {
                id: 1,
                homeTeam: 'AS FAR',
                awayTeam: 'Wydad Athletic Club',
                date: '2025-03-15',
                time: '20:00',
                venue: 'Complexe Sportif Prince Moulay Abdellah',
                competition: 'Botola Pro',
                status: 'Programmé',
                score: '-'
            },
            {
                id: 2,
                homeTeam: 'Raja Club Athletic',
                awayTeam: 'Renaissance de Berkane',
                date: '2025-03-16',
                time: '18:00',
                venue: 'Stade Mohammed V',
                competition: 'Coupe du Trône',
                status: 'Programmé',
                score: '-'
            },
            {
                id: 3,
                homeTeam: 'FUS de Rabat',
                awayTeam: 'AS FAR',
                date: '2025-03-09',
                time: '16:00',
                venue: 'Complexe Sportif de FUS',
                competition: 'Botola Pro',
                status: 'Terminé',
                score: '2-1'
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

    // Display Player Lists
    function displayPlayerLists() {
        const tbody = document.getElementById('playerListsTableBody');
        tbody.innerHTML = mockData.playerLists.map(list => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">${list.team}</td>
                <td class="px-6 py-4">${list.submissionDate}</td>
                <td class="px-6 py-4">${list.playerCount}</td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold ${
                        list.status === 'Validé' ? 'bg-green-100 text-green-800' :
                        list.status === 'Rejeté' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                    }">${list.status}</span>
                </td>
                <td class="px-6 py-4 text-right">
                    <button onclick="handlePlayerList('view', ${list.id})" 
                            class="text-blue-600 hover:text-blue-800">
                        Voir détails
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Display Injuries
    function displayInjuries() {
        const tbody = document.getElementById('injuriesTableBody');
        tbody.innerHTML = mockData.injuries.map(injury => `
            <tr class="hover:bg-gray-50">
                <td class="px-4 py-2">
                    <div class="font-medium">${injury.player}</div>
                    <div class="text-sm text-gray-500">${injury.team}</div>
                </td>
                <td class="px-4 py-2">
                    <div class="font-medium">${injury.type}</div>
                    <div class="text-sm text-gray-500">Durée: ${injury.duration}</div>
                </td>
                <td class="px-4 py-2">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                        ${injury.status}
                    </span>
                </td>
            </tr>
        `).join('');
    }

    // Display Sanctions
    function displaySanctions() {
        const tbody = document.getElementById('sanctionsTableBody');
        tbody.innerHTML = mockData.sanctions.map(sanction => `
            <tr class="hover:bg-gray-50">
                <td class="px-4 py-2">
                    <div class="font-medium">${sanction.player}</div>
                    <div class="text-sm text-gray-500">${sanction.team}</div>
                </td>
                <td class="px-4 py-2">
                    <span class="px-2 py-1 rounded-full text-xs font-semibold ${
                        sanction.type === 'Carton Rouge' ? 'bg-red-100 text-red-800' :
                        sanction.type === 'Carton Jaune' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                    }">${sanction.type}</span>
                </td>
                <td class="px-4 py-2">
                    <div class="font-medium">${sanction.duration}</div>
                    <div class="text-sm text-gray-500">Depuis: ${sanction.date}</div>
                </td>
            </tr>
        `).join('');
    }

    // Display Matches
    function displayMatches() {
        const tbody = document.getElementById('matchesTableBody');
        tbody.innerHTML = mockData.matches.map(match => `
            <tr class="hover:bg-gray-50">
                <td class="px-6 py-4">
                    <div class="font-medium">${match.date}</div>
                    <div class="text-sm text-gray-500">${match.time}</div>
                </td>
                <td class="px-6 py-4">
                    <div class="font-medium">${match.homeTeam} vs ${match.awayTeam}</div>
                    <div class="text-sm text-gray-500">${match.competition}</div>
                </td>
                <td class="px-6 py-4 font-medium">${match.score}</td>
                <td class="px-6 py-4">
                    <div class="text-sm">${match.venue}</div>
                </td>
                <td class="px-6 py-4 text-right">
                    <button onclick="handleMatch('view', ${match.id})" 
                            class="text-blue-600 hover:text-blue-800">
                        Détails
                    </button>
                </td>
            </tr>
        `).join('');
    }

    // Tab Navigation
    const tabs = ['playerListsTab', 'injuriesTab', 'sanctionsTab', 'matchesTab', 'statisticsTab'];
    const sections = ['playerListsSection', 'injuriesSanctionsSection', 'injuriesSanctionsSection', 'matchesSection', 'statisticsSection'];
    
    tabs.forEach((tabId, index) => {
        document.getElementById(tabId).addEventListener('click', () => {
            // Update active tab
            tabs.forEach(t => document.getElementById(t).classList.remove('active', 'bg-blue-700'));
            document.getElementById(tabId).classList.add('active', 'bg-blue-700');
            
            // Show corresponding section
            sections.forEach(s => document.getElementById(s).classList.add('hidden'));
            document.getElementById(sections[index]).classList.remove('hidden');
            
            // Update main title and load data
            const titles = {
                playerListsTab: 'Validation des Listes de Joueurs',
                injuriesTab: 'Suivi des Blessures',
                sanctionsTab: 'Gestion des Sanctions',
                matchesTab: 'Gestion des Matchs',
                statisticsTab: 'Statistiques'
            };
            document.getElementById('mainTitle').textContent = titles[tabId];
            
            // Load data based on active tab
            switch(tabId) {
                case 'playerListsTab':
                    displayPlayerLists();
                    break;
                case 'injuriesTab':
                case 'sanctionsTab':
                    displayInjuries();
                    displaySanctions();
                    break;
                case 'matchesTab':
                    displayMatches();
                    break;
                case 'statisticsTab':
                    initializeCharts();
                    break;
            }
        });
    });

    // Initialize Statistics Charts
    function initializeCharts() {
        // General Statistics
        new Chart(document.getElementById('generalStats'), {
            type: 'bar',
            data: {
                labels: ['Matchs Joués', 'Victoires', 'Nuls', 'Défaites'],
                datasets: [{
                    label: 'Statistiques Générales',
                    data: [20, 12, 5, 3],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });

        // Sanctions Statistics
        new Chart(document.getElementById('sanctionsStats'), {
            type: 'pie',
            data: {
                labels: ['Cartons Jaunes', 'Cartons Rouges', 'Avertissements'],
                datasets: [{
                    data: [15, 3, 8],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });

        // Injuries Statistics
        new Chart(document.getElementById('injuriesStats'), {
            type: 'doughnut',
            data: {
                labels: ['Musculaire', 'Articulaire', 'Trauma', 'Autre'],
                datasets: [{
                    data: [8, 5, 3, 2],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });
    }

    // Initialize the page
    populateTeamFilter();
    document.getElementById('playerListsTab').click();
});
