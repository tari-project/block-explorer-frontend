# Tari Blockchain Explorer Front-End

### Development

You'll need a running [blockchain-explorer-api](https://github.com/tari-project/blockchain-explorer-api) instance
    
    git clone https://github.com/tari-project/block-explorer-frontend.git
    cd block-explorer-frontend
    npm install
    cp .env.sample .env
    # Set `REACT_APP_EXPLORER_API_URL=` to the url of your running backend 
    npm run start
    
### Build

    npm run build
    
### Deploy

    # Build the dist
    docker run -v "$PWD/dist":/app/dist --env-file=.env quay.io/tarilabs/block-explorer-frontend
    
    # Serve from the docker container
    docker run -p 3000:3000 --env-file=.env quay.io/tarilabs/block-explorer-frontend
