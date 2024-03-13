# Kapeta Readme
This file contains some structural information about this service.

This file will be overwritten every time you change the service definition in Kapeta.

## Structure
This service is structured as follows:
* ```generated```: Contains generated code that shouldn't be edited directly
* ```pkg```: Contains your own and generated code that you can and should edit

In the sub folder structure you'll find the following:
* ```generated/entities```: Contains the entities used by the service.
* ```generated/rest_api```: Contains the REST API routes.
* ```generated/services```: Contains the REST API service interfaces.
* ```pkg/services```: Contains the services used by the REST API routes. This is where you should add your business logic

## REST API 
To edit the REST API handlers edit the services found here:
[pkg/services](pkg/services/)

The REST layer itself is generated for you - so your service
will be called as specified within the REST API definition in Kapeta.

You just need to worry about the logic.

The service files will only be generated if they don't already exist - or if they have not
changed since the last time they were generated.


