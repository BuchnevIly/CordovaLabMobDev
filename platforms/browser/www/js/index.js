var pictureSource;   // picture source
var destinationType; // sets the format of returned value

document.addEventListener("deviceready",onDeviceReady,false);

function onBatteryStatus(status) {
    document.getElementById("buttery").innerHTML = status.level + "%";
}

function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;

    window.addEventListener("batterystatus", onBatteryStatus, false);

}

function onPhotoDataSuccess(imageData) {
    var smallImage = document.getElementById('smallImage');
    smallImage.style.display = 'block';
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

function capturePhoto() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
}

function onFail(message) {
    alert('Failed because: ' + message);
}

setInterval(function () {
    navigator.geolocation.getCurrentPosition(gpsOnSuccess, gpsOnError);
    navigator.accelerometer.getCurrentAcceleration(accelerometerSuccess, accelerometerError);
}, 100);

var gpsOnSuccess = function(position) {
    document.getElementById("gps").innerHTML =
        'Latitude: '          + position.coords.latitude          + '<br>' +
        'Longitude: '         + position.coords.longitude         + '<br>' +
        'Altitude: '          + position.coords.altitude          + '<br>' +
        'Accuracy: '          + position.coords.accuracy          + '<br>' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br>' +
        'Heading: '           + position.coords.heading           + '<br>' +
        'Speed: '             + position.coords.speed             + '<br>' +
        'Timestamp: '         + position.timestamp                + '<br>';
};

// onError Callback receives a PositionError object
//
function gpsOnError(error) {
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}

function accelerometerSuccess(acceleration) {
    document.getElementById("accelerometer").innerHTML =
        'Acceleration X: ' + acceleration.x + '<br>' +
        'Acceleration Y: ' + acceleration.y + '<br>' +
        'Acceleration Z: ' + acceleration.z + '<br>' +
        'Timestamp: '      + acceleration.timestamp + '<br>';
}

function accelerometerError() {
    alert('onError!');
}

function activate() {
    if (document.getElementById('proximity').checked)
        navigator.proximity.enableSensor();
    else
        navigator.proximity.disableSensor();
}
