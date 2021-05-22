$(document).ready(function () {
    // Covid Api Data
    $.getJSON("https://api.covid19india.org/data.json", function (data) {

        let table = document.getElementById("basic-datatable");
        console.log(table);

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

        $("#basic-datatable").DataTable({
            keys: 10,
            language: {
                paginate: {
                    previous: "<i class='mdi mdi-chevron-left'>",
                    next: "<i class='mdi mdi-chevron-right'>",
                },
            },
            drawCallback: function () {
                $(".dataTables_paginate > .pagination").addClass("pagination-rounded");
            },
        });

    });
});
