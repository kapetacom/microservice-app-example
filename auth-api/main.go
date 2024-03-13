package main

import (
	"github.com/elgris/microservice-app-example/auth-api/generated"
	"github.com/elgris/microservice-app-example/auth-api/generated/auth"
	kapeta "github.com/kapetacom/sdk-go-config"
	"github.com/kapetacom/sdk-go-rest-server/server"
)

func main() {
	e := server.NewWithDefaults()

	config, err := kapeta.Init(".")
	if err != nil {
		panic(err)
	}
	port, err := config.GetServerPort("rest")
	if err != nil {
		panic(err)
	}

	host, err := config.GetServerHost()
	if err != nil {
		panic(err)
	}

	e.Use(auth.AddJWTMiddleware(config)...)

	err = generated.RegisterRouters(e, config)
	if err != nil {
		panic(err)
	}

	// Start the server and log if it fails
	e.Logger.Debug("Starting server on port " + port)
	e.Logger.Fatal(e.Start(host + ":" + port))
}
