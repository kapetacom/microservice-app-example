# Kapeta Readme
This file contains some structural information about this service.

This file will be overwritten every time you change the service definition in Kapeta.

## Structure
This service is structured as follows:
* ```src/generated```: Contains generated code that shouldn't be edited directly
* ```src/main```: Contains your own and generated code that you can and should edit

In the sub folder structure you'll find the following:
* ```src/generated/java/com/elgris/usersapi/repositories```: Contains anything related to databases
* ```src/generated/java/com/elgris/usersapi/dto```: Contains the entities used by the service.
  * These are generated files and should not be edited directly
* ```src/generated/java/com/elgris/usersapi/rest```: Contains the REST API routes.
* ```src/generated/java/com/elgris/usersapi/service```: Contains the REST interfaces.
  * These are generated files and should not be edited directly
* ```src/main/java/com/elgris/usersapi/service```: Contains the service layer logic. This is where you should add your business logic

## REST API 
To edit the REST API handlers edit the services found here:
[src/main/java/com/elgris/usersapi/service](src/main/java/com/elgris/usersapi/service/)

The REST layer itself is generated for you - so your service
will be called as specified within the REST API definition in Kapeta.

You just need to worry about the logic.

The service files will only be generated if they don't already exist - or if they have not
changed since the last time they were generated.



