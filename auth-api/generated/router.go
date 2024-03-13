package generated

import (
	rest "github.com/elgris/microservice-app-example/auth-api/generated/rest_api"
	kapeta "github.com/kapetacom/sdk-go-config/providers"
	"github.com/kapetacom/sdk-go-rest-server/server"
)

func RegisterRouters(e *server.KapetaServer, cfg kapeta.ConfigProvider) error {
	if err := rest.CreateAuthRouter(e, cfg); err != nil {
		return err
	}
	return nil
}
