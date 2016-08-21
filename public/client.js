window.onload = function() {

	var ctx = document.getElementById("progress_bar").getContext('2d');

	var labels = [];
	var acceptanceData = [];

	var socket = io.connect('http://localhost:8081');

	var found_fguy = false;
	var found_ethkim = false;

	var progress;

	socket.on('message', function (data) {
		acceptanceData = data.msg;
		acceptanceData.sort(function(a, b){return b-a});

		for (var i = 0; i < acceptanceData.length; i++) {
			if(acceptanceData[i] == 14 && !found_fguy) {
				labels.push("fguy");
				found_fguy = true;
			}
			else if(acceptanceData[i] == 321 && !found_ethkim) {
				labels.push("ethkim");
				found_ethkim = true;
			}
			else {
				labels.push(i+1);
			}			
		}

		var bar_data = {
			labels: labels,
			datasets: [{
				label: '# of Accepted Submission',
				data: acceptanceData,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
	        		'rgba(54, 162, 235, 0.2)',
	        		'rgba(255, 206, 86, 0.2)'
				],
				borderColor: [
					'rgba(255,99,132,1)',
	    			'rgba(54, 162, 235, 1)',
	        		'rgba(255, 206, 86, 1)'
				],
				borderWidth: 0,

			}]
		};

		var options = {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero:false
					},
					gridLines: {
						display:false
					}
				}],
				xAxes: [{
					gridLines: {
						display:false
					}
				}]
			}
		};
		
		progress = new Chart(ctx, {
			type: 'horizontalBar',
			data: bar_data,
			options: options
		});
	});

};