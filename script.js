$( document ).ready(function() {

  // Create new aREST device when button is clicked
  $('#validate').click(function() {
    var address = $('#device_address').val();
    var device = new Device(address);

    // Set device pins
    device.pinMode(2, "INPUT");
    device.pinMode(3, "OUTPUT");
    device.pinMode(4,"OUTPUT");
    device.pinMode(5, "OUTPUT");
    device.pinMode(6,"OUTPUT");
    device.pinMode(7,"OUTPUT");
    device.pinMode(8,"OUTPUT");
    device.pinMode(9, "OUTPUT");
    // Button
    $('#on').click(function() {
      device.digitalWrite(8, 1);
      device.digitalWrite(3, 1);
      device.digitalWrite(4, 1);
      device.digitalWrite(5, 1);
      device.digitalWrite(6, 1);
    });

    $('#off').click(function() {
      device.digitalWrite(8, 0);
      device.digitalWrite(3, 0);
      device.digitalWrite(4, 0);
      device.digitalWrite(5, 0);
      device.digitalWrite(6, 0);
    });

    // Para el boton en el pin 5
    $('#on1').click(function(){
      device.digitalWrite(7,1);
      });

        $('#off1').click(function(){
      device.digitalWrite(7,0);
      });

    // Analog write
    $('#slider').mouseup(function() {
      var val = $('#slider').val();
      device.analogWrite(6, val);
    });

    //Analog read every 5 seconds
    device.analogRead(0, function(data) {
      $("#A0").html(data.return_value);
    });
    setInterval(function() {
      device.analogRead(0, function(data) {
        $("#A0").html(data.return_value);
      });
    }, 5000);

    // Digital read every 5 seconds
    device.digitalRead(11, function(data) {
      $('#2').html(data.return_value);
    });  
    setInterval(function() {
      device.digitalRead(11, function(data) {
        $('#2').html(data.return_value);
      });
    }, 5000);

    // Temperature display
    device.getVariable('temperature', function(data) {
      $('#temperature').html(data.temperature);
    });

    // Humidity display
    device.getVariable('humidity', function(data) {
      $('#humidity').html(data.humidity);
    });
  });

});