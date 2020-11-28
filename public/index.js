$(document).ready(function() {
    var json;

    $.getJSON('data.json', function(data) {
        json = data;

        var values = [];
        var dates = [];
        for (let i = 0; i < json.readings[0].length; i++)
        {
          values.push(json.readings[0][i].value);
          dates.push(json.readings[0][i].date);
        }

        var labels = dates;
        var data = values;

        var ctx = chart.getContext('2d');
        var config = {
            type: 'line',
            responsive: true,
            maintainAspectRatio: false,
            data: {
              labels: labels,
              datasets: [{
                  label: 'Voltage (V)',
                  data: data,
                  backgroundColor: 'rgba(0, 119, 204, 0.3)'
              }]
           }
        };

        var myChart = new Chart(ctx, config);

    });
});
