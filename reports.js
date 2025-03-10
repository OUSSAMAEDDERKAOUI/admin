// Données de démonstration pour les rapports
const reports = [
    {
        id: 1,
        date: '2024-03-15',
        time: '20:00',
        homeTeam: {
            name: 'FC Local',
            logo: 'https://via.placeholder.com/30'
        },
        awayTeam: {
            name: 'AS Visiteur',
            logo: 'https://via.placeholder.com/30'
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
        },
        players: {
            home: [
                { name: 'Thomas Dubois', number: 1, position: 'Gardien' },
                { name: 'Lucas Martin', number: 4, position: 'Défenseur' }
                // ... autres joueurs
            ],
            away: [
                { name: 'Hugo Bernard', number: 1, position: 'Gardien' },
                { name: 'Antoine Dupont', number: 4, position: 'Défenseur' }
                // ... autres joueurs
            ]
        },
        goals: [
            { team: 'home', player: 'Thomas Dubois', minute: 23 },
            { team: 'away', player: 'Hugo Bernard', minute: 45 },
            { team: 'home', player: 'Lucas Martin', minute: 78 }
        ],
        sanctions: [
            { player: 'Antoine Dupont', type: 'yellow', minute: 34 },
            { player: 'Lucas Martin', type: 'yellow', minute: 67 }
        ],
        substitutions: [
            { team: 'home', in: 'Joueur Entrant', out: 'Joueur Sortant', minute: 46 }
        ]
    },
    // ... autres rapports
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
                        <div class="text-sm text-gray-500">${formatDate(report.date)}</div>
                        <div class="text-sm text-gray-500">${report.venue}</div>
                    </div>
                </div>
            </div>

            <!-- Arbitres -->
            <div class="border-t pt-4">
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

            <!-- Buts -->
            <div class="border-t pt-4">
                <h4 class="font-semibold mb-2">Buts</h4>
                <div class="space-y-2">
                    ${report.goals.map(goal => `
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            <span class="text-sm">${goal.player} (${goal.minute}')</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Sanctions -->
            <div class="border-t pt-4">
                <h4 class="font-semibold mb-2">Sanctions</h4>
                <div class="space-y-2">
                    ${report.sanctions.map(sanction => `
                        <div class="flex items-center space-x-2">
                            <div class="w-4 h-6 ${sanction.type === 'yellow' ? 'bg-yellow-400' : 'bg-red-600'} rounded"></div>
                            <span class="text-sm">${sanction.player} (${sanction.minute}')</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Remplacements -->
            <div class="border-t pt-4">
                <h4 class="font-semibold mb-2">Remplacements</h4>
                <div class="space-y-2">
                    ${report.substitutions.map(sub => `
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
                            </svg>
                            <span class="text-sm">${sub.in} ⟷ ${sub.out} (${sub.minute}')</span>
                        </div>
                    `).join('')}
                </div>
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

    renderFilteredReports(filteredReports);
}

// Écouteurs d'événements pour les filtres
document.getElementById('teamFilter')?.addEventListener('change', filterReports);
document.getElementById('dateFilter')?.addEventListener('change', filterReports);
document.getElementById('resultFilter')?.addEventListener('change', filterReports);

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    renderReportsTable();
});