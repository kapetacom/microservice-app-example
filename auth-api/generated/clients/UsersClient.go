package clients

//
// GENERATED SOURCE - DO NOT EDIT
//
import (
	"encoding/json"
	"github.com/elgris/microservice-app-example/auth-api/generated/entities"
	"github.com/kapetacom/sdk-go-rest-client"
)

type Users interface {
	GetUsers() ([]*entities.User, error)

	GetUser(username string) (*entities.User, error)

	Login(request *entities.LoginRequest) (*entities.LoginResponse, error)
}

type UsersClient struct {
	client *client.RestClient
}

// NewUsersClient creates new Users client
func NewUsersClient() Users {
	return &UsersClient{client: client.NewRestClient("Users", true)}
}

func (c *UsersClient) GetUsers() ([]*entities.User, error) {
	var result []*entities.User

	resp, err := c.client.GET(c.client.ResolveURL("/users/"))
	if err != nil {
		return result, err
	}
	defer resp.Body.Close()

	err = json.NewDecoder(resp.Body).Decode(&result)
	return result, err

}

func (c *UsersClient) GetUser(username string) (*entities.User, error) {
	var result *entities.User

	resp, err := c.client.GET(c.client.ResolveURL("/users/%v", username))
	if err != nil {
		return result, err
	}
	defer resp.Body.Close()

	err = json.NewDecoder(resp.Body).Decode(&result)
	return result, err

}

func (c *UsersClient) Login(request *entities.LoginRequest) (*entities.LoginResponse, error) {
	var result *entities.LoginResponse

	resp, err := c.client.POST(c.client.ResolveURL("/users/login"), request)
	if err != nil {
		return result, err
	}
	defer resp.Body.Close()

	err = json.NewDecoder(resp.Body).Decode(&result)
	return result, err

}
