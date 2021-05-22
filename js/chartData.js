$(document).ready(function () {
    // Covid Api Data
    $.getJSON("https://api.covid19india.org/data.json", function (data) {
        //Total Cases stored in variable

        let state = [];
        let confirmed = [];
        let active = [];
        let recovered = [];
        let deaths = [];
        let stateCode = [];


        // console.log(last)
        $.each(data.statewise, function (id, obj) {
            state.push(obj.state);
            confirmed.push(obj.confirmed);
            active.push(obj.active);
            recovered.push(obj.recovered);
            deaths.push(obj.deaths);
            stateCode.push(obj.statecode)

        });
        // console.log(stateCode)
        state.shift();
        confirmed.shift();
        active.shift();
        recovered.shift();
        deaths.shift();
        stateCode.shift();


        const ctx2 = document.getElementById('myChart').getContext('2d');
        const myChart2 = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: stateCode,
                datasets: [
                    {
                        label: 'Active',
                        data: active,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 1,
                        stepped: true
                    },
                    {
                        label: 'Confirmed',
                        data: confirmed,
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.2)'
                        ],
                        borderColor: [,
                            'rgba(54, 162, 235, 1)'
                        ],
                        borderWidth: 1,
                        stepped: true
                    },
                    {
                        label: 'Recovered',
                        data: recovered,
                        backgroundColor: [
                            'rgba(255, 206, 86, 0.2)'
                        ],
                        borderColor: [,
                            'rgba(255, 206, 86, 1)'
                        ],
                        borderWidth: 1,
                        stepped: true
                    },
                    {
                        label: 'Death',
                        data: deaths,
                        backgroundColor: [,
                            'rgba(75, 192, 192, 0.2)'
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                        ],
                        borderWidth: 1,
                        stepped: true
                    },
                ]
            },
            options: {
                responsive: true,
                interaction: {
                    intersect: false,
                    axis: 'x'
                },
                maintainAspectRatio: !1,
                legend: {display: !1},
                scales: {
                    yAxes: [{
                        gridLines: {display: !1, color: "rgba(0,0,0,0.05)"},
                        stacked: !1,
                        ticks: {stepSize: 1000}
                    }],
                    xAxes: [{
                        barPercentage: .7,
                        categoryPercentage: .5,
                        stacked: !1,
                        gridLines: {color: "rgba(0,0,0,0.01)"}
                    }]
                },

                animations: {
                    y: {
                        easing: 'easeInOutElastic',
                        from: (ctx) => {
                            if (ctx.type === 'data') {
                                if (ctx.mode === 'default' && !ctx.dropped) {
                                    ctx.dropped = true;
                                    return 0;
                                }
                            }
                        }
                    }
                }
            }
        });

        let last10 = data.cases_time_series
        let dates = [];
        let dateConfirmed = []
        let dateActive = []
        let dateRecovered = []
        let dateDeaths = []
        for (i = last10.length - 1; i > last10.length - 11; i--) {
            console.log(last10[i].dateymd)
            dates.push(last10[i].dateymd)
            dateConfirmed.push(last10[i].dailyconfirmed)
            dateRecovered.push(last10[i].dailyrecovered)
            dateDeaths.push(last10[i].dailydeceased)
        }
        const ctx = document.getElementById('daily-chart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dates,
                datasets: [
                    {
                        label: 'Confirmed',
                        data: dateConfirmed,
                        backgroundColor: [
                            'rgba(255, 7, 57, 0.8)'
                        ],
                    },
                    {
                        label: 'Recovered',
                        data: dateRecovered,
                        backgroundColor: [
                            'rgba(40, 167, 69, 0.8)'
                        ],
                    },
                    {
                        label: 'Death',
                        data: dateDeaths,
                        backgroundColor: [
                            'rgba(108, 117, 125, 0.8)'
                        ],
                    },
                ]
            },
            options: {
                responsive: true,
                interaction: {
                    intersect: false,
                    axis: 'x'
                },
                maintainAspectRatio: !1,
                legend: {display: !1},
                scales: {
                    yAxes: [{
                        gridLines: {display: !1, color: "rgba(0,0,0,0.05)"},
                        stacked: !1,
                        ticks: {stepSize: 1000}
                    }],
                    xAxes: [{
                        barPercentage: .7,
                        categoryPercentage: .5,
                        stacked: !1,
                        gridLines: {color: "rgba(0,0,0,0.01)"}
                    }]
                },

                animations: {
                    y: {
                        easing: 'easeInOutElastic',
                        from: (ctx) => {
                            if (ctx.type === 'data') {
                                if (ctx.mode === 'default' && !ctx.dropped) {
                                    ctx.dropped = true;
                                    return 0;
                                }
                            }
                        }
                    }
                }
            }
        });

    });
});
