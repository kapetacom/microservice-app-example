//
// GENERATED SOURCE - DO NOT EDIT
//
package rest

import (
	"github.com/elgris/microservice-app-example/auth-api/generated/entities"
	generated "github.com/elgris/microservice-app-example/auth-api/generated/services"
	"github.com/elgris/microservice-app-example/auth-api/pkg/services"
	providers "github.com/kapetacom/sdk-go-config/providers"
	"github.com/kapetacom/sdk-go-rest-server/request"
	"github.com/kapetacom/sdk-go-rest-server/server"
	"github.com/labstack/echo/v4"
	"net/http"
)

func CreateAuthRouter(e *server.KapetaServer, cfg providers.ConfigProvider) error {
	routeHandler, err := services.NewAuthHandler(cfg)
	if err != nil {
		return err
	}

	// Done like this to ensure interface compliance
	func(serviceInterface generated.AuthInterface) {
		e.GET("/version", func(ctx echo.Context) error {
			type RequestParameters struct {
			}
			params := &RequestParameters{}

			if err := request.GetRequestParameters(ctx.Request(), params); err != nil {
				return echo.NewHTTPError(http.StatusBadRequest, err.Error())
			}
			return serviceInterface.GetVersion(ctx)
		})

		e.POST("/login", func(ctx echo.Context) error {
			type RequestParameters struct {
				Payload *entities.LoginRequest `in:"body=json"`
			}
			params := &RequestParameters{}

			if err := request.GetRequestParameters(ctx.Request(), params); err != nil {
				return echo.NewHTTPError(http.StatusBadRequest, err.Error())
			}
			return serviceInterface.Login(ctx, params.Payload)
		})
	}(routeHandler)

	return nil

}
