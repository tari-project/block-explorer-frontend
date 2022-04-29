import React, { useEffect, useState } from 'react';
import './SingleBlock.scss';
import { useParams } from 'react-router-dom';
import { Constants, fetchSingleBlock } from '../helpers/api';
import StatRow from './SingleBlock/StatRow';
import SingleBlockViewHeader from './SingleBlock/SingleBlockViewHeader';
import { connect } from 'react-redux';
import ProgressBar from './SingleBlock/ProgressBar';
import ClusterGraph from './Graphs/ClusterGraph';
import { Block, Body, Header, Pow } from '../types/Blocks';
import { Link } from 'react-router-dom';
import { ClusterPoint } from '../types/SingleBlockGraph';
import { ReactComponent as LoadingBars } from '../assets/bars.svg';
import ColorMapItem from './SingleBlock/ColorMapItem';
import './SingleBlock/SingleBlockViewHeader.scss';

interface Props {
    constants: Constants;
}

interface Status {
    status: string;
    message: string;
}

function BlockType(param) {
    switch (param) {
        case '0':
            return 'Monero';
        case '1':
            return 'SHA-3';
        default:
            return 'Undefined';
    }
}

function SingleBlock({ constants }: Props) {
    const { id } = useParams();
    const [singleBlock, setSingleBlock] = useState({} as Block);
    const [blockHeader, setblockHeader] = useState({} as Header);
    const [blockPow, setblockPow] = useState({} as Pow);
    const [status, setStatus] = useState({ status: 'loading', message: '' } as Status);
    const [clusterData, setClusterData] = useState([] as ClusterPoint[]);
    useEffect(() => {
        if (!id) {
            setStatus({
                status: 'error',
                message: 'Invalid block height or hash'
            });
            return;
        }
        setStatus({
            status: 'loading',
            message: ''
        });
        fetchSingleBlock(id)
            .then((block) => {
                if (!block || !block.block) {
                    setStatus({
                        status: 'error',
                        message: 'Block not found'
                    });
                    return;
                }

                setSingleBlock(block.block);
                setblockHeader(block.block.header as Header);
                setblockPow(block.block.header.pow as Pow);
                const blockBody = block.block.body as Body;
                const { inputs = [], kernels = [], outputs = [] } = blockBody;
                let singleBlockDataArray: ClusterPoint[] = [];
                singleBlockDataArray = singleBlockDataArray.concat(
                    inputs.map((i) => ({
                        group: 'inputs',
                        size: inputs.length,
                        color: '#F97C0C',
                        tooltip: `Input<br/>${i.commitment.slice(0, 10)}`
                    }))
                );

                singleBlockDataArray = singleBlockDataArray.concat(
                    kernels.map((i) => ({
                        group: 'kernels',
                        size: kernels.length,
                        color: '#FB576D',
                        tooltip: `Kernel<br/>${i.excess.slice(0, 10)}`
                    }))
                );

                singleBlockDataArray = singleBlockDataArray.concat(
                    outputs.map((i) => ({
                        group: 'outputs',
                        size: outputs.length,
                        color: '#2274AF',
                        tooltip: `Output<br/>${i.commitment.slice(0, 10)}`
                    }))
                );
                setClusterData(singleBlockDataArray);
                setStatus({
                    status: 'complete',
                    message: ''
                });
            })
            .catch((e) => {
                console.error(e);
                setStatus({
                    status: 'error',
                    message: e.error?.message || 'There was an error fetching the block'
                });
            });
    }, [id]);

    const [constantsData, setConstantsData] = useState({} as Constants);
    useEffect(() => {
        setConstantsData(constants as Constants);
    }, [constants]);

    const { hash, prev_hash, nonce, total_kernel_offset, version, timestamp, height } = blockHeader;
    const { pow_algo } = blockPow;

    const date = timestamp && new Date(timestamp.seconds * 1000).toLocaleString();
    const { _weight } = singleBlock;
    const { max_block_transaction_weight } = constantsData;

    return (
        <div className="SingleBlock">
            {clusterData.length && status.status === 'complete' ? (
                <div className="max-container">
                    <SingleBlockViewHeader title="Block Data" />
                    <div className="block-data">
                        <div className="shadow-box block1">
                            <div className="colorMapping">
                                <ColorMapItem title="Inputs" className="inputs" />
                                <ColorMapItem title="Outputs" className="outputs" />
                                <ColorMapItem title="Kernels" className="kernels" />
                            </div>
                            <div className="block-clustergraph">
                                <ClusterGraph data={clusterData} width={1280} height={500} />
                            </div>
                        </div>
                        <div className="shadow-box block2">
                            <ProgressBar weight={_weight} maxWeight={max_block_transaction_weight} />
                            <h3>Mining Details</h3>
                            <StatRow label="Timestamp" value={date} />
                            <h3>Technical Details</h3>
                            <StatRow label="Block Height" value={height} />
                            <StatRow label="Block Algorithm" value={BlockType(pow_algo)} />
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
                    </div>
                </div>
            ) : status.status === 'loading' ? (
                <LoadingBars className="fill-color-lowlight" />
            ) : (
                <h1 className="noBlockFound">
                    {status.message}
                    <br />
                    <br />
                    <Link to={'/'}>Go Back</Link>
                </h1>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    constants: state.constants
});
export default connect(mapStateToProps)(SingleBlock);
