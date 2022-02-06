const defaultState = {
    competitions: [
        {
            id: 12,
            name: "name",
            area: "area",
            currentSeason: {
                startDate: "date",
                endDate: "date"
            }
        }
    ],
    competition: {
        id: 12,
        teams: [
            {
                id: "id",
                name: "name",
                crestUrl: "crestUrl"
            }
        ],
        matches: [
            {
                id: "id",
                season: {
                    startDate: "date",
                    endDate: "date"
                },
                awayTeam: "awayTeam",
                homeTeam: "homeTeam"
            }
        ]
    },
    team: {
        matches: []
    }
}

