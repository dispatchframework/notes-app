# notes-app

## Building the UI

Do the following steps from within the `notes-ui` directory:

1. create an `.htpasswd` file:
    `htpasswd -c .htpasswd vmworld`
2. edit `src/environments/*`, updating the api_url appropriately
3. build the image:
    `./build.sh dispatchframework/notes-ui:0.0.1`
4. push the image (optional):
    `docker push dispatchframework/notes-ui:0.0.1`

## Serve the UI

Locally:
    `docker run -p80:80 dispatchframework/notes-ui:0.0.1`

Hosted:
    `kubectl apply -f deployment.yaml`

## Create the Server

Do the following steps from within the `notes-server` directory:

1. Create the azure postgres service (this takes a long time ~10 minutes):
    `dispatch create -f postgres.yaml`

2. Create the image which includes the required python depenencies:
    `dispatch create -f image.yaml`

3. Create the functions:
    `dispatch create -f function.yaml`

4. Create the api:
    `dispatch create -f api.yaml`

## Tearing Down

Repeat the steps for creating the server, with `dispatch delete -f <file>`