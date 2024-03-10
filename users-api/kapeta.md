# Kapeta Readme

This file contains some structural information about the block.

This file will be overwritten every time you change the block definition in Kapeta.

## Folder Structure

This type of block only requires a Dockerfile - which 
can contain anything

### Build System
The block is build using docker. The build process is defined in the `Dockerfile` in the root of the block.

### Configuration

Normally Kapeta provides SDKs for the blocks to use - which 
knows where to find the configuration in different environments
and how to use it.

For docker based blocks, the configuration is still available to the block
through env vars - but your code is responsible for reading and using them.

#### Environment Variables
To map the kapeta-specific environment variables to the ones your code expects
you define a `kapeta.config.env` file in the root of the block.
In here you set the environment variables that your block expects to use and
map them to the kapeta-specific ones.

To see an overview of all kapeta-specific environment variables 
that are available to your block, see here:
https://docs.kapeta.com/v1/docs/environment-variables


An example of a `kapeta.config.env` file:
```env
MONGODB_HOST_NAME=${KAPETA_CONSUMER_RESOURCE_MYDB_MONGODB_CREDENTIALS_USERNAME}
MY_ENV_VAR=${KAPETA_ENV_VAR}
NODE_ENV=${KAPETA_INSTANCE_CONFIG_ENVIRONMENT_NAME}
STRIPE_KEY=${KAPETA_INSTANCE_CONFIG_STRIPE_KEY}
```

#### Configuration files
If your block needs to read configuration from files, 
you can define a `kapeta.config.yml` file in the root of the block.
this file should contain the paths to the configuration files that your block needs and
the values that should be injected into them.

You can inject all environment variables into the configuration files using the `${}` syntax.

To see an overview of all kapeta-specific environment variables
that are available to your block, see here:
https://docs.kapeta.com/v1/docs/environment-variables

An example of a `kapeta.config.yml` file:
```yaml
src/main/resources/application-database.yml: |-
  my:
    config:
      key: value
  mongodb:
    uri: mongodb://${KAPETA_CONSUMER_RESOURCE_MYDB_MONGODB}/${KAPETA_CONSUMER_RESOURCE_MYDB_MONGODB|json:path.inside.array.2}
src/config/config.staging.json: |-
  {
    "my": {
      "config": {
        "key": "${KAPETA_INSTANCE_CONFIG_STRIPE_KEY}"
      }
    }
  }
src/config/config.local.json: |-
  {
    "my": {
      "config": {
        "key": ${KAPETA_CONSUMER_RESOURCE_MYDB_MONGODB}
      }
    }
  }
config/mongo.json: ${KAPETA_CONSUMER_RESOURCE_MYDB_MONGODB}
preloader/preload.sql: ${KAPETA_INSTANCE_CONFIG|json:Preload.sql}
```