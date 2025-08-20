# intulsa-aerovision-be


### Addding .env variables

We use the GH Secrets feature and inject these values as env vars at build time.

    * They should be in the format `{ENVIRONMENT}_{VARIABLE_NAME}`
2. In the `.github/workflows/{environment}_ecs_deploy.yml` file, add the variable to the `- name: Add secrets to task definition` section.
