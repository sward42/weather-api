"use strict";


let apiKeys = {};

let weatherList = (searchText)=>{
	return new Promise((resolve, reject)=>{
		$.ajax({
			method: 'GET',
			url: 'apiKeys.json'
		}).then((response)=>{
			//console.log("response", response);
			apiKeys = response;
			let authHeader =apiKeys.apiKey;

		$.ajax({
			method: 'GET',
			// headers:{
			// 	'Authorization': authHeader
			// },
			url: `http://api.openweathermap.org/data/2.5/weather?zip=${searchText}&units=imperial&APPID=${authHeader}`,
		}).then((response2)=> {
			console.log("response2", response2);
			resolve(response2);
		}, (errorResponse2)=>{
			//console.log("imgur fail", errorResponse2);
			reject(errorResponse2);
		});



		}, (errorResponse)=>{
			//console.log("errorResponse", errorResponse);
			reject(errorResponse);
		});
	});
};

$(document).ready(function(){
	
	$('#search-button').on('click', ()=>{
		$('#search-button').button('loading');
		$('#output').html("");
		let searchy = $('#weather-search').val();
		console.log("it's working", searchy);
		weatherList(searchy).then((dataFromWeather)=>{
			$('#search-button').button('reset');
			console.log("dataFromWeather", dataFromWeather);
			// dataFromWeather.forEach((image)=>{
			$('#output').append(`<div>${dataFromWeather.name}</div>
								<div>Current Temperature: ${dataFromWeather.main.temp}</div>
								<div>Current Conditions: ${dataFromWeather.weather[0].description}</div>
								<div>Air Pressure: ${dataFromWeather.main.pressure}</div>
								<div>Wind Speed: ${dataFromWeather.wind.speed}</div>`);
			// });
		});
	});

});