$(document).ready(function () {
    // Covid Api Data
    $.getJSON("https://api.covid19india.org/data.json", function (data) {
        //Total Cases stored in variable
        let total_active = data.statewise[0].active;
        let total_confirmed = data.statewise[0].confirmed;
        let total_deaths = data.statewise[0].deaths;
        let total_recoverd = data.statewise[0].recovered;
        let time = data.statewise[0].lastupdatedtime;

        $("#active").append(total_active);
        $("#confirmed").append(total_confirmed);
        $("#deaths").append(total_deaths);
        $("#recovered").append(total_recoverd);
        $("#time").append(time);

        //Daily Update
        let daily =
            data.cases_time_series[data.cases_time_series.length - 1].dailyconfirmed;
        let daily_recovered =
            data.cases_time_series[data.cases_time_series.length - 1].dailyrecovered;
        let daily_deaths =
            data.cases_time_series[data.cases_time_series.length - 1].dailydeceased;
        // console.log(daily);
        $("#dailyconfirmed").append(daily);
        $("#dailyrecovered").append(daily_recovered);
        $("#dailydeceased").append(daily_deaths);

        let state = [];
        let confirmed = [];
        let active = [];
        let recovered = [];
        let deaths = [];
        let stateCode = [];

        let last10 = data.cases_time_series
        let last = last10.filter(function (e, index){
            return index >= last10.length - 10;
        })

        console.log(last)
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
                        borderWidth: 1
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
                        borderWidth: 1
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
                        borderWidth: 1
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
                        borderWidth: 1
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

        const gdpData = {
            "AS": 16.63,
            "KL": 11.58,
            "DZ": 158.97,
        };

        $("#map").vectorMap({
            map: "in_mill",
            backgroundColor: "transparent",
            series: {
                regions: [
                    {
                        values: gdpData,
                        scale: ["#ffffff", "#ff0000"],
                        normalizefunction: "polynomial",
                    },
                ],
            },
            onRegionTipShow: function (event, label, index) {
                // console.log(index)
                console.log(event)
                label.html(
                    '<b>' + data.statewise[0].confirmed + '</b><br/>'
                );
            },
            regionStyle: {initial: {fill: "#6c757d"}},
        });
        // Api Data in a table manner

        // let totalactive = data.statewise;
        let table = document.getElementById("table-data");
        // console.log(table);

        for (let i = 1; i < data["statewise"].length - 1; i++) {
            // console.log();
            // console.log(data["statewise"][i - 1]["state"]);

            let a = table.insertRow(); // Create empty row
            a.insertCell(0);
            table.rows[i].cells[0].innerHTML = data["statewise"][i]["state"];

            a.insertCell(1);
            table.rows[i].cells[1].innerHTML = data["statewise"][i]["confirmed"];

            a.insertCell(2);
            table.rows[i].cells[2].innerHTML = data["statewise"][i]["active"];

            a.insertCell(3);
            table.rows[i].cells[3].innerHTML = data["statewise"][i]["recovered"];

            a.insertCell(4);
            table.rows[i].cells[4].innerHTML = data["statewise"][i]["deaths"];

            a.insertCell(5);
            table.rows[i].cells[5].innerHTML =
                data["statewise"][i]["lastupdatedtime"];
        }
    });
});
