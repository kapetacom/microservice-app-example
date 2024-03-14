//
// GENERATED SOURCE - DO NOT EDIT
//
package rest

import (
	"fmt"
	"github.com/elgris/microservice-app-example/auth-api/generated/entities"
	generated "github.com/elgris/microservice-app-example/auth-api/generated/services"
	"github.com/elgris/microservice-app-example/auth-api/pkg/services"
	providers "github.com/kapetacom/sdk-go-config/providers"
	"github.com/kapetacom/sdk-go-rest-server/request"
	"github.com/kapetacom/sdk-go-rest-server/server"
	"github.com/labstack/echo/v4"
)

func CreateAuthRouter(e *server.KapetaServer, cfg providers.ConfigProvider) error {
	routeHandler, err := services.NewAuthHandler(cfg)
	if err != nil {
		return err
	}

	// Done like this to ensure interface compliance
	func(serviceInterface generated.AuthInterface) {
		e.GET("/version", func(ctx echo.Context) error {

			return serviceInterface.GetVersion(ctx)
		})

		e.POST("/login", func(ctx echo.Context) error {
			var err error

			var payload *entities.LoginRequest
			if err = request.GetBody(ctx, payload); err != nil {
				return ctx.String(400, fmt.Sprintf("bad request, unable to unmarshal payload %v", err))
			}
			return serviceInterface.Login(ctx, payload)
		})
	}(routeHandler)

	return nil
}
