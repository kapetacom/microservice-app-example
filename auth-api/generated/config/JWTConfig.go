package config

import (
	"fmt"

	kapeta "github.com/kapetacom/sdk-go-config"
)

type JWTConfig struct {
	Secret string `json:"secret" xml:"secret" yaml:"secret"`
}

func GetJWTConfigWithDefault(defaultValue JWTConfig) JWTConfig {
	anyconfig := kapeta.CONFIG.GetOrDefault("JWT", defaultValue)
	result := JWTConfig{}
	err := kapeta.Transcode(anyconfig, &result)
	if err != nil {
		panic(fmt.Errorf("failed to transcode config: %w", err))
	}

	return result
}

func GetJWTConfig() JWTConfig {
	anyconfig := kapeta.CONFIG.Get("JWT")
	result := JWTConfig{}
	err := kapeta.Transcode(anyconfig, &result)
	if err != nil {
		panic(fmt.Errorf("failed to transcode config: %w", err))
	}

	return result
}
