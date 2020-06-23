/* eslint-disable no-undef */
const _generateUrl = (prefix, url) => {
    return (prefix.indexOf('://') === -1 ? `${prefix}://` : prefix) + url;
};
const config = {
    apiDomain: process.env.REACT_APP_EXPLORER_API_DOMAIN,
    apiUrl: _generateUrl(
        process.env.REACT_APP_EXPLORER_API_PREFIX || 'http',
        process.env.REACT_APP_EXPLORER_API_DOMAIN
    ),
    wsUrl: _generateUrl(
        process.env.REACT_APP_EXPLORER_WS_PREFIX || 'ws',
        process.env.REACT_APP_EXPLORER_API_DOMAIN + '/ws'
    ),
    tokenName: process.env.REACT_APP_TOKEN_NAME || 'tXTR',
    initialBlockCount: +(process.env.REACT_APP_INITIAL_BLOCK_COUNT || 100),
    maxBlocks: +(process.env.REACT_APP_MAX_BLOCKS || 100)
};
export default config;
