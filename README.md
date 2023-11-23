# Node API (Workshop)

## Usage

Start the stack (host / terminal: 1):

```sh
docker-compose up
```

Enter in the API container (host / terminal 2):

```sh
docker-compose exec api bash
```

Then, install packages / dependencies ("API" container / terminal 2):

```sh
yarn
```

Then, start the API server in `development` environment ("API" container / terminal 2):

```sh
yarn dev
```

or in `production` environment (__only__):

```sh
yarn start
```

### Tests

Runs the tests ("API" container / terminal 3):

```sh
yarn test
```

## Troubleshooting

Clean the volume container (on the host):

```sh
./bin/vc-clean
```

