$( document ).ready(function() {

  // Crear nuevo dispositivo Arest cuando se hace clic en el botón
  $('#validate').click(function() {
    var address = $('#device_address').val();
    var device = new Device(address);

    // Pines conjunto de dispositivos
    // declarando como salida o como entrada
    device.pinMode(2, "INPUT");
    device.pinMode(3, "OUTPUT");
    device.pinMode(4,"OUTPUT");
    device.pinMode(5, "OUTPUT");
    device.pinMode(6,"OUTPUT");
    device.pinMode(7,"OUTPUT");
    device.pinMode(8,"OUTPUT");
    device.pinMode(9, "OUTPUT");
    // Botones
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
    // funciones con el evento click
    $('#on1').click(function(){
      device.digitalWrite(7,1);
      });
    setInterval(function() {
      device.analogRead(0, function(data) {
        $("#on1").html(data.return_value);
      });
    }, 5000);

        $('#off1').click(function(){
      device.digitalWrite(7,0);
      });
        setInterval(function() {
      device.analogRead(0, function(data) {
        $("#off1").html(data.return_value);
      });
    }, 5000);

    // escritura analógica
    $('#slider').mouseup(function() {
      var val = $('#slider').val();
      device.analogWrite(6, val);
    });


    //Analog leer cada 5 segundos
    device.analogRead(0, function(data) {
      $("#A0").html(data.return_value);
    });
    setInterval(function() {
      device.analogRead(0, function(data) {
        $("#A0").html(data.return_value);
      });
    }, 5000);

    // Digital leer cada 5 segundos
    device.digitalRead(11, function(data) {
      $('#2').html(data.return_value);
    });  
    setInterval(function() {
      device.digitalRead(11, function(data) {
        $('#2').html(data.return_value);
      });
    }, 5000);

    // exhibición de la temperatura
    device.getVariable('temperature', function(data) {
      $('#temperature').html(data.temperature);
    });

    // pantalla Humedad
    device.getVariable('humidity', function(data) {
      $('#humidity').html(data.humidity);
    });
  });

});