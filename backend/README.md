# intulsa-aerovision-be


### Addding .env variables

We use the GH Secrets feature and inject these values as env vars at build time.

1. Add a secret into GitHub Secrets in the `Actions` section. (Located in the repo settings.)
    * They should be in the format `{ENVIRONMENT}_{VARIABLE_NAME}`
    * The format should be `SECRET_{variable_name}: ${{ secrets.{environment}_{variable_name} }}`.
    * Example: `SECRET_TEST_VAR: ${{ secrets.DEV_TEST_VAR }}`
