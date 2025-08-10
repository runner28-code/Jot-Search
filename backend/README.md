# intulsa-aerovision-be



We use the GH Secrets feature and inject these values as env vars at build time.

1. Add a secret into GitHub Secrets in the `Actions` section. (Located in the repo settings.)
    * They should be in the format `{ENVIRONMENT}_{VARIABLE_NAME}`
