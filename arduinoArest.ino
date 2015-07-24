/* 
  This a simple example of the aREST Library for Arduino (Uno/Mega/Due/Teensy)
  using the Ethernet library (for example to be used with the Ethernet shield). 
  See the README file for more details.
 
  Written in 2014 by Marco Schwartz under a GPL license. 
*/

// Libraries
#include <SPI.h>
#include <Ethernet.h>
#include <aREST.h>
#include <avr/wdt.h>

// Introducza una direccion MAC para su controlador de abajo
byte mac[] = { 0x90, 0xA2, 0xDA, 0x0E, 0xFE, 0x40 };

// Direccion IP en caso de falla de DHCP
IPAddress ip(192,168,1,12);

// Servidor ethernet
EthernetServer server(80);

// Crear una instancia Arest
aREST rest = aREST();

// Las variables que se exponen ala API
int temperature;
int humidity;

void setup(void)
{  
  // Inicial Serial
  Serial.begin(9600);
  
  // Las variables Init y exponerlos a REST API
  temperature = 24;
  humidity = 40;
  rest.variable("temperature",&temperature);
  rest.variable("humidity",&humidity);

  // Función para ser expuesto
  rest.function("led",ledControl);
  
  // Dar nombre y el ID de dispositivo
  rest.set_id("008");
  rest.set_name("dapper_drake");

  // Inicie la conexión Ethernet y el servidor
  // if (Ethernet.begin(mac) == 0) {
    //Serial.println("Failed to configure Ethernet using DHCP");
  // No tiene sentido en continuar , por lo que no hacer nada para siempre :
    // tratar de congifure utilizando la dirección IP en lugar de DHCP:
    Ethernet.begin(mac, ip);
  //}
  server.begin();
  Serial.print("server is at ");
  Serial.println(Ethernet.localIP());

  // Inicio de vigilancia
  wdt_enable(WDTO_4S);
}

void loop() {  
  
  // escuchar a los clientes entrantes
  EthernetClient client = server.available();
  rest.handle(client);
  wdt_reset();
  
}

// Función Personal accesible por la API
int ledControl(String command) {
  
  // Obtener estado de comando
  int state = command.toInt();
  
  digitalWrite(6,state);
  return 10;
}
