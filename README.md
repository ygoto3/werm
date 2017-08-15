<h1 align="center">Werm</h1>

<h5 align="center">A minimal Terminal environment on Web</h5>

<div align="center"><img alt="Screen Shot" src="./assets/docs/screenshot.png" /></div>

## Requirement

- Docker v17.06.0-ce~
- GNU Make v3.82~

## Run

Set environment variables:

- `WERM_USER_NAME`
  - User name for basic authentication along with `WERM_USER_PASS`
  - Specifying no user name means no basic authentication
- `WERM_USER_PASS`
  - User password for basic authentication along with `WERM_USER_NAME`
  - Specifying no user password means no basic authentication

Start Docker if you don't have Docker started

```sh
$ make start-docker
```

Then

```sh
$ make run
```

### Test

```sh
$ yarn test
```
