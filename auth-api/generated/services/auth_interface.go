// GENERATED SOURCE - DO NOT EDIT
//
package services

import (
	"github.com/elgris/microservice-app-example/auth-api/generated/entities"
	"github.com/labstack/echo/v4"
)

// AuthInterface is an interface for AuthHandler
// It is used to define the methods that are implemented in the AuthHandler
type AuthInterface interface {
	GetVersion(ctx echo.Context) error

	Login(ctx echo.Context, payload *entities.LoginRequest) error
}
