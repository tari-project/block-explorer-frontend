import React, { useEffect, useState } from 'react';
import './SingleBlock.css';
import { useParams } from 'react-router-dom';
import { Constants, fetchSingleBlock } from '../helpers/api';
import StatRow from './SingleBlock/StatRow';
import SingleBlockViewHeader from './SingleBlock/SingleBlockViewHeader';
import { connect } from 'react-redux';
import ProgressBar from './SingleBlock/ProgressBar';
import ClusterGraph from './Graphs/ClusterGraph';
import { Block, Body, Header, Pow, InputsEntity, KernelsEntity, OutputsEntity } from '../helpers/Blocks';
import { Inputs, Kernels, Outputs } from '../helpers/SingleBlock';
import { Link } from 'react-router-dom';

interface Props {
    constants: Constants;
}

function SingleBlock({ constants }: Props) {
    const { id } = useParams();

    const [singleBlock, setSingleBlock] = useState({} as Block);
    const [blockHeader, setblockHeader] = useState({} as Header);
    const [blockPow, setblockPow] = useState({} as Pow);
    const [blockBody, setblockBody] = useState({} as Body);

    useEffect(() => {
        try {
            id &&
                fetchSingleBlock(id).then((block) => {
                    if (block && block.block) {
                        setSingleBlock(block.block);
                        setblockHeader(block.block.header as Header);
                        setblockPow(block.block.header.pow as Pow);
                        setblockBody(block.block.body as Body);
                    }
                });
        } catch (e) {
            console.error(e);
        }
    }, [id]);

    const [constantsData, setConstantsData] = useState({} as Constants);
    useEffect(() => {
        setConstantsData(constants as Constants);
    }, [constants]);

    const singleBlockDataArray: any[] = [];

    const { hash, prev_hash, nonce, total_kernel_offset, version, timestamp } = blockHeader;
    const { accumulated_monero_difficulty, accumulated_blake_difficulty } = blockPow;
    const { inputs = [], kernels = [], outputs = [] } = blockBody;

    inputs.map((i: InputsEntity) => {
        const temp: Inputs = {
            group: 'inputs',
            size: inputs.length,
            color: '#F97C0C',
            ...i
        };
        singleBlockDataArray.push(temp);
        return temp;
    });

    kernels.map((i: KernelsEntity) => {
        const temp: Kernels = {
            group: 'kernels',
            size: kernels.length,
            color: '#FB576D',
            ...i
        };
        singleBlockDataArray.push(temp);
        return temp;
    });

    outputs.map((i: OutputsEntity) => {
        const temp: Outputs = {
            group: 'outputs',
            size: outputs.length,
            color: '#2274AF',
            ...i
        };
        singleBlockDataArray.push(temp);
        return temp;
    });

    const date = timestamp && new Date(timestamp.seconds * 1000).toLocaleString();
    const { _weight } = singleBlock;
    const { max_block_transaction_weight } = constantsData;

    return (
        <div className="SingleBlock">
            {hash ? (
                <div>
                    <SingleBlockViewHeader title="Block Data" />
                    <ClusterGraph data={singleBlockDataArray} width={1000} height={400} />
                    <ProgressBar weight={_weight} maxWeight={max_block_transaction_weight} />
                    <h1>Mining Details</h1>
                    <StatRow label="Timestamp" value={date} />
                    <h1>Technical Details</h1>
                    <StatRow label="Accumulated Monero Difficulty" value={accumulated_monero_difficulty} />
                    <StatRow label="Accumulated Blake Difficulty" value={accumulated_blake_difficulty} />
                    <Link to={`/block/${prev_hash}`}>
                        <StatRow label="Previous Hash" value={prev_hash} />
                    </Link>
                    <Link to={`/block/${hash}`}>
                        <StatRow label="Hash" value={hash} />
                    </Link>
                    <StatRow label="Nonce" value={nonce} />
                    <StatRow label="Total Kernel Offset" value={total_kernel_offset} />
                    <StatRow label="Version" value={version} />
                </div>
            ) : (
                <h1 className="noBlockFound">No block found.</h1>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    constants: state.constants
});
export default connect(mapStateToProps)(SingleBlock);
