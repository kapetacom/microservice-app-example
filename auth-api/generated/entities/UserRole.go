//
// GENERATED SOURCE - DO NOT EDIT
//
package entities

type UserRole string

const USER UserRole = "USER"
const ADMIN UserRole = "ADMIN"

func (s *UserRole) ToString() (string, error) {
	return string(*s), nil
}
func (s *UserRole) FromString(x string) error {
	*s = UserRole(x)
	return nil
}
