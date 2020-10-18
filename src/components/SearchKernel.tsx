/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState } from 'react';
import './SearchKernel.css';
import { useParams, Link, Redirect } from 'react-router-dom';
import { searchKernel } from '../helpers/api';
import { ReactComponent as LoadingBars } from '../assets/bars.svg';

interface Status {
    status: string;
    message: string;
    hash?: string;
}

const renderStatus = (status: Status) => {
    switch (status.status) {
        case 'redirect':
            return <Redirect push to={`/block/${status.hash}`} />;
        case 'complete':
            return (
                <div>
                    <LoadingBars fill={'#000'} />
                    <h1>{status.message}</h1>
                    <h2>Redirecting...</h2>
                </div>
            );
        case 'loading':
            return (
                <div>
                    <LoadingBars fill={'#000'} />
                    <h1>{status.message}</h1>
                </div>
            );
        default:
            return (
                <h1 className="noBlockFound">
                    {status.message} <Link to={'/'}>Go Back</Link>
                </h1>
            );
    }
};

const SearchKernel = () => {
    const { nonce, signature } = useParams();
    const [status, setStatus] = useState({ status: 'loading', message: '', hash: '' } as Status);
    useEffect(() => {
        let timer;

        if (!nonce || !signature) {
            setStatus({
                status: 'error',
                message: 'Invalid nonce or signature'
            });
            return;
        }
        setStatus({
            status: 'loading',
            message: 'Searching for transaction...'
        });
        searchKernel(nonce, signature)
            .then((response) => {
                if (response.blocks.length > 0) {
                    const block = response.blocks[0];
                    const height = block.block.header.height;
                    const hash = block.block.header.hash;
                    const message = `Found in block #${height}.`;
                    setStatus({
                        status: 'complete',
                        message,
                        hash
                    });
                    timer = setTimeout(() => setStatus({ status: 'redirect', message, hash }), 2000);
                } else {
                    setStatus({
                        status: 'error',
                        message: 'There was an error finding that transaction.'
                    });
                }
            })
            .catch((e) => {
                console.error(e);
                setStatus({
                    status: 'error',
                    message: 'Transaction not found'
                });
            });
        if (timer) return window.clearTimeout(timer);
    }, [nonce, signature]);

    return <div className="SearchKernel">{renderStatus(status)}</div>;
};

export default SearchKernel;
