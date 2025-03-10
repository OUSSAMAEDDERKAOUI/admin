// Données de démonstration pour les rapports
const reports = [
    {
        id: 1,
        date: '2024-03-15',
        time: '20:00',
        homeTeam: {
            name: 'FC Local',
            logo: 'https://via.placeholder.com/30',
            players: [
                { name: 'Thomas Dubois', number: 1, position: 'Gardien' },
                { name: 'Lucas Martin', number: 4, position: 'Défenseur' },
                { name: 'Paul Dubois', number: 8, position: 'Milieu' },
                { name: 'Antoine Dupont', number: 10, position: 'Attaquant' }
            ],
            goals: [
                { player: 'Antoine Dupont', minute: 23, type: 'Action de jeu' },
                { player: 'Paul Dubois', minute: 78, type: 'Penalty' }
            ],
            sanctions: [
                { player: 'Lucas Martin', type: 'yellow', minute: 34, reason: 'Faute grossière' },
                { player: 'Paul Dubois', type: 'yellow', minute: 67, reason: 'Simulation' }
            ],
            substitutions: [
                { in: 'Marc Petit', out: 'Antoine Dupont', minute: 65 },
                { in: 'Hugo Bernard', out: 'Paul Dubois', minute: 80 }
            ]
        },
        awayTeam: {
            name: 'AS Visiteur',
            logo: 'https://via.placeholder.com/30',
            players: [
                { name: 'Pierre Martin', number: 1, position: 'Gardien' },
                { name: 'Jean Dupont', number: 5, position: 'Défenseur' },
                { name: 'Michel Bernard', number: 7, position: 'Milieu' },
                { name: 'Luc Petit', number: 9, position: 'Attaquant' }
            ],
            goals: [
                { player: 'Luc Petit', minute: 45, type: 'Coup franc' }
            ],
            sanctions: [
                { player: 'Jean Dupont', type: 'red', minute: 75, reason: 'Comportement violent' }
            ],
            substitutions: [
                { in: 'David Martin', out: 'Michel Bernard', minute: 70 }
            ]
        },
        score: {
            home: 2,
            away: 1
        },
        venue: 'Stade Municipal',
        referees: {
            main: 'Pierre Dupont',
            assistant1: 'Jean Martin',
            assistant2: 'Marc Bernard'
        }
    }
];

// Fonction pour formater la date
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

// Fonction pour afficher le score
function formatScore(score) {
    return `${score.home} - ${score.away}`;
}

// Fonction pour obtenir le résultat du match
function getMatchResult(score) {
    if (score.home > score.away) return 'victory';
    if (score.home < score.away) return 'defeat';
    return 'draw';
}

// Fonction pour afficher les arbitres
function formatReferees(referees) {
    return `${referees.main} (Principal)<br>
            <span class="text-sm text-gray-500">${referees.assistant1}, ${referees.assistant2}</span>`;
}

// Fonction pour afficher le tableau des rapports
function renderReportsTable() {
    const tbody = document.getElementById('reportsTableBody');
    tbody.innerHTML = reports.map(report => `
        <tr>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">${formatDate(report.date)}</div>
                <div class="text-sm text-gray-500">${report.time}</div>
            </td>
            <td class="px-6 py-4">
                <div class="flex items-center space-x-3">
                    <img src="${report.homeTeam.logo}" alt="${report.homeTeam.name}" class="w-8 h-8 rounded-full">
                    <span class="text-sm font-medium">vs</span>
                    <img src="${report.awayTeam.logo}" alt="${report.awayTeam.name}" class="w-8 h-8 rounded-full">
                </div>
                <div class="text-sm text-gray-500 mt-1">
                    ${report.homeTeam.name} vs ${report.awayTeam.name}
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">${formatScore(report.score)}</div>
            </td>
            <td class="px-6 py-4">
                <div class="text-sm text-gray-900">${formatReferees(report.referees)}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button class="text-indigo-600 hover:text-indigo-900" onclick="viewReportDetails(${report.id})">
                    Voir détails
                </button>
            </td>
        </tr>
    `).join('');
}

// Fonction pour afficher les détails d'une équipe
function renderTeamDetails(team, isHome) {
    return `
        <div class="border rounded-lg p-4 ${isHome ? 'bg-blue-50' : 'bg-gray-50'}">
            <div class="flex items-center mb-4">
                <img src="${team.logo}" alt="${team.name}" class="w-12 h-12 rounded-full">
                <h4 class="text-lg font-semibold ml-3">${team.name}</h4>
            </div>

            <!-- Joueurs -->
            <div class="mb-4">
                <h5 class="font-semibold mb-2">Composition de l'équipe</h5>
                <div class="grid grid-cols-2 gap-2">
                    ${team.players.map(player => `
                        <div class="flex items-center space-x-2">
                            <span class="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm">
                                ${player.number}
                            </span>
                            <span class="text-sm">${player.name}</span>
                            <span class="text-xs text-gray-500">(${player.position})</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Buts -->
            <div class="mb-4">
                <h5 class="font-semibold mb-2">Buts</h5>
                ${team.goals.length > 0 ? `
                    <div class="space-y-2">
                        ${team.goals.map(goal => `
                            <div class="flex items-center space-x-2">
                                <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                </svg>
                                <span class="text-sm">${goal.player} (${goal.minute}') - ${goal.type}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : '<p class="text-sm text-gray-500">Aucun but marqué</p>'}
            </div>

            <!-- Sanctions -->
            <div class="mb-4">
                <h5 class="font-semibold mb-2">Sanctions</h5>
                ${team.sanctions.length > 0 ? `
                    <div class="space-y-2">
                        ${team.sanctions.map(sanction => `
                            <div class="flex items-center space-x-2">
                                <div class="w-4 h-6 ${sanction.type === 'yellow' ? 'bg-yellow-400' : 'bg-red-600'} rounded"></div>
                                <span class="text-sm">${sanction.player} (${sanction.minute}')</span>
                                <span class="text-sm text-gray-500">- ${sanction.reason}</span>
                            </div>
                        `).join('')}
                    </div>
                ` : '<p class="text-sm text-gray-500">Aucune sanction</p>'}
            </div>

            <!-- Remplacements -->
            <div>
                <h5 class="font-semibold mb-2">Remplacements</h5>
                ${team.substitutions.length > 0 ? `
                    <div class="space-y-2">
                        ${team.substitutions.map(sub => `
                            <div class="flex items-center space-x-2">
                                <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                                </svg>
                                <span class="text-sm">${sub.in} ⟷ ${sub.out} (${sub.minute}')</span>
                            </div>
                        `).join('')}
                    </div>
                ` : '<p class="text-sm text-gray-500">Aucun remplacement</p>'}
            </div>
        </div>
    `;
}

// Fonction pour afficher les détails d'un rapport
function viewReportDetails(id) {
    const report = reports.find(r => r.id === id);
    if (!report) return;

    const modal = document.getElementById('reportModal');
    const modalContent = document.getElementById('modalContent');

    modalContent.innerHTML = `
        <div class="space-y-6">
            <!-- En-tête du match -->
            <div class="bg-gray-50 p-4 rounded-lg">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                        <img src="${report.homeTeam.logo}" alt="${report.homeTeam.name}" class="w-12 h-12">
                        <div class="text-2xl font-bold">${formatScore(report.score)}</div>
                        <img src="${report.awayTeam.logo}" alt="${report.awayTeam.name}" class="w-12 h-12">
                    </div>
                    <div class="text-right">
                        <div class="text-sm text-gray-500">${formatDate(report.date)} - ${report.time}</div>
                        <div class="text-sm text-gray-500">${report.venue}</div>
                    </div>
                </div>
            </div>

            <!-- Arbitres -->
            <div class="bg-white p-4 rounded-lg shadow-sm">
                <h4 class="font-semibold mb-2">Arbitres</h4>
                <div class="grid grid-cols-3 gap-4">
                    <div>
                        <div class="text-sm font-medium">Principal</div>
                        <div class="text-sm text-gray-500">${report.referees.main}</div>
                    </div>
                    <div>
                        <div class="text-sm font-medium">Assistant 1</div>
                        <div class="text-sm text-gray-500">${report.referees.assistant1}</div>
                    </div>
                    <div>
                        <div class="text-sm font-medium">Assistant 2</div>
                        <div class="text-sm text-gray-500">${report.referees.assistant2}</div>
                    </div>
                </div>
            </div>

            <!-- Détails des équipes -->
            <div class="grid grid-cols-2 gap-6">
                <!-- Équipe domicile -->
                ${renderTeamDetails(report.homeTeam, true)}
                
                <!-- Équipe visiteur -->
                ${renderTeamDetails(report.awayTeam, false)}
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}

// Gestionnaire pour fermer le modal
document.getElementById('closeModal')?.addEventListener('click', () => {
    document.getElementById('reportModal').classList.add('hidden');
});

// Filtrage des rapports
function filterReports() {
    const teamFilter = document.getElementById('teamFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    const resultFilter = document.getElementById('resultFilter').value;

    const filteredReports = reports.filter(report => {
        const matchesTeam = teamFilter === 'all' || 
            report.homeTeam.name.toLowerCase().includes(teamFilter) || 
            report.awayTeam.name.toLowerCase().includes(teamFilter);
        
        const matchesDate = !dateFilter || report.date === dateFilter;
        
        const matchesResult = resultFilter === 'all' || getMatchResult(report.score) === resultFilter;

        return matchesTeam && matchesDate && matchesResult;
    });

    renderReportsTable(filteredReports);
}

// Écouteurs d'événements pour les filtres
document.getElementById('teamFilter')?.addEventListener('change', filterReports);
document.getElementById('dateFilter')?.addEventListener('change', filterReports);
document.getElementById('resultFilter')?.addEventListener('change', filterReports);

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    renderReportsTable();
});