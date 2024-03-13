package services

import (
	"github.com/elgris/microservice-app-example/auth-api/generated/clients"
	"github.com/elgris/microservice-app-example/auth-api/generated/entities"
	providers "github.com/kapetacom/sdk-go-config/providers"
	"github.com/labstack/echo/v4"
)

type AuthHandler struct {
	users clients.Users
}

func NewAuthHandler(cfg providers.ConfigProvider) (*AuthHandler, error) {
	return &AuthHandler{
		users: clients.NewUsersClient(),
	}, nil
}

func (handler *AuthHandler) GetVersion(ctx echo.Context) error {
	return ctx.JSON(200, "Auth API, written in Go\n")
}

func (handler *AuthHandler) Login(ctx echo.Context, request *entities.LoginRequest) error {
	// We moved the logic to the user service
	response, err := handler.users.Login(request)
	if err != nil {
		return err
	}

	return ctx.JSON(200, response)
}
