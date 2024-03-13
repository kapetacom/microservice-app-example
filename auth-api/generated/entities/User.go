//
// GENERATED SOURCE - DO NOT EDIT
//
package entities

type User struct {
	Username string `json:"username" xml:"username" yaml:"username"`

	Firstname string `json:"firstname" xml:"firstname" yaml:"firstname"`

	Lastname string `json:"lastname" xml:"lastname" yaml:"lastname"`

	Role UserRole `json:"role" xml:"role" yaml:"role"`
}
