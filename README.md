# Tari Blockchain Explorer Front-End

## Contributing

Contributions are welcomed! To have your PR merged successfully please:
- [sign your commits](https://docs.github.com/en/github/authenticating-to-github/signing-commits)
- [rebase your commits](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History) into a single one.

It's okay to force push your PR branch if you initially forget these.

Happy hacking!
## Development

Get the code and dependencies:

    git clone https://github.com/tari-project/block-explorer-frontend.git
    cd block-explorer-frontend
    npm install

The easiest way to get running is to use the live [Tari block explorer](https://explore.tari.com) backend by using the following `.env` file:

    # .env
    REACT_APP_EXPLORER_API_DOMAIN=explore.tari.com/api
    REACT_APP_EXPLORER_API_PREFIX=https
    REACT_APP_EXPLORER_WS_PREFIX=ws
    REACT_APP_TOKEN_NAME=tXTR

Or you can run the [blockchain-explorer-api](https://github.com/tari-project/blockchain-explorer-api) yourself, and use the sample env:

    cp .env.sample .env
    # Set `REACT_APP_EXPLORER_API_URL=` to the url of your running backend
    # eg: REACT_APP_EXPLORER_API_URL=localhost:4000

Start the dev server with:

    npm run start

## Deployment

### Build

    npm run build

### Docker build

    docker build . -t block-explorer-frontend:latest

### Deploy

    # Build the dist
    docker run -v "$PWD/dist":/app/dist --env-file=.env quay.io/tarilabs/block-explorer-frontend

    # Serve from the docker container
    docker run -p 3000:3000 --env SERVE=1 --env-file=.env quay.io/tarilabs/block-explorer-frontend
