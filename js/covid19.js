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

    });
});
