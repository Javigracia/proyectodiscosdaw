$(document).ready(function () {

    google.charts.load("current", { packages: ['corechart'] });

    var topFive = new columnChart();

    setInterval(topFive.getData.bind(topFive), 2000);

});


function columnChart() {
    this.disks;
    this.colours = ["#FFD700", "#C0C0C0", "#CC6633", "#330000", "#330033"];

    this.getData();

}

columnChart.prototype = {

    getData: function()
    {
        $.ajax({
            url: "/api/Vtop5",
            dataType: 'json',
            success: function (data) {
                this.disks = data;
                google.charts.setOnLoadCallback(this.drawChart.bind(this));
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    drawChart: function ()
    {

        var disks = [];
        disks.push(["Título", "Puntuación", { role: "style" }]);
        for (var i = 0; i < this.disks.length; i++)
        {
            var disk = [this.disks[i].Titulo, parseInt(this.disks[i].n5), this.colours[i]];
            disks.push(disk);
        }

        var data = google.visualization.arrayToDataTable(disks);

        var view = new google.visualization.DataView(data);
        

        var options = {
            title: "Los 5 discos mejor valorados",
            width: 600,
            height: 400,
            bar: { groupWidth: "95%" },
            legend: { position: "none" },
            vAxis:
            {
                minValue : 0,
                maxValue: 10,
                ticks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
            }
        };
        var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
        chart.draw(view, options);
    }

}