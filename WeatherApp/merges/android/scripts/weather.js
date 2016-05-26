var OpenWeatherAppKey = "76da1fb86ec315cc3b352b49668a612f";

function getWeatherWithZipCode() {

    var zipcode = $('#zip-code-input').val();

    var queryString =
        'http://api.openweathermap.org/data/2.5/weather?zip='
        + zipcode + ',ca&appid=' + OpenWeatherAppKey + '&units=metric';
   if (navigator.connection.type != 'No network connection') {
        $.getJSON(queryString, function (results) {

        showWeatherData(results);

        }).fail(function (jqXHR) {
            $('#error-msg').show();
            $('#error-msg').text("Error retrieving data. " + jqXHR.statusText);
        });
    } else {
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data: "+networkState);
    }
    return false;
}

function getWeatherWithGeoLocation() {

    $('#app-title').text("Android Weather");
    navigator.geolocation.getCurrentPosition(onGetLocationSuccess, onGetLocationError,
      { enableHighAccuracy: true });
    $('#error-msg').show();
    $('#error-msg').text('Determining your current location ...');

    $('#get-weather-btn').prop('disabled', true);
    
}

function onGetLocationSuccess(position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    var queryString =
      'http://api.openweathermap.org/data/2.5/weather?lat='
        + latitude + '&lon=' + longitude + '&appid=' + OpenWeatherAppKey + '&units=metric';

    $('#get-weather-btn').prop('disabled', false);
    if (navigator.connection.type != 'No network connection'){
        $.getJSON(queryString, function (results) {

            showWeatherData(results);

        }).fail(function (jqXHR) {
            $('#error-msg').show();
            $('#error-msg').text("Error retrieving data. " + jqXHR.statusText);
        });
    } else {
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data: " + networkState);
    }
}
function onGetLocationError(error) {

    $('#error-msg').text('Error getting location');
    $('#get-weather-btn').prop('disabled', false);
}


function showWeatherData(results) {

    if (results.weather.length) {

        $('#error-msg').hide();
        $('#weather-data').show();

        $('#title').text(results.name);
        $('#temperature').text(results.main.temp);
        $('#wind').text(results.wind.speed);
        $('#humidity').text(results.main.humidity);
        $('#visibility').text(results.weather[0].main);

        var sunriseDate = new Date(results.sys.sunrise);
        $('#sunrise').text(sunriseDate.toLocaleTimeString());

        var sunsetDate = new Date(results.sys.sunrise);
        $('#sunset').text(sunsetDate.toLocaleTimeString());

    } else {
        $('#weather-data').hide();
        $('#error-msg').show();
        $('#error-msg').text("Error retrieving data. ");
    }
}