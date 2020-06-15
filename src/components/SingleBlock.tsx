import React, {useEffect, useState} from 'react';
import './SingleBlock.css';
import {
    useParams
} from "react-router-dom";
import {Constants, fetchConstants, fetchSingleBlock, SingleBlockData} from "../helpers/api";
import StatRow from "./SingleBlock/StatRow";
import SingleBlockViewHeader from "./SingleBlock/SingleBlockViewHeader";
import { connect } from 'react-redux';
import ProgressBar from "./SingleBlock/ProgressBar";
import ClusterGraph from "./Graphs/ClusterGraph";

interface Props {
    block?: any;
}

function SingleBlock({ block }: Props) {

    const { id } = useParams();

    const [blockHeader, setblockHeader] = useState(([] as unknown) as any);
    const [blockPow, setblockPow] = useState(([] as unknown) as any);
    const [blockBody, setblockBody] = useState(([] as unknown) as any);
    const [blockFound, setBlockFound] = useState(([] as unknown) as any);
    const [blockWeight, setBlockWeight] = useState('...');
    const [maxBlockWeight, setMaxBlockWeight] = useState(([] as unknown) as any);

    useEffect(() => {
        try {
            id && fetchSingleBlock(id).then((block: SingleBlockData) => {
                if(block && block.block) {
                    setblockHeader(block.block.header);
                    setblockPow(block.block.header.pow);
                    setblockBody(block.block.body);
                    setBlockWeight(block.block._miningTime)
                } else {
                    setBlockFound(false);
                }
            });
        } catch (e) {
            console.error(e);
        }
    }, [id]);

    useEffect(() => {
        try {
            id && fetchConstants().then((constants: Constants) => {
                setMaxBlockWeight(constants.max_block_transaction_weight);
            });
        } catch (e) {
            console.error(e);
        }
    }, [id]);

    const singleBlockDataArray: any[] = [];

    const { hash, prev_hash, nonce, total_kernel_offset, version, timestamp } = blockHeader;
    const { accumulated_monero_difficulty, accumulated_blake_difficulty } = blockPow;
    const { inputs, kernels, outputs } = blockBody;

   inputs.forEach(i => {
        i.group = 'inputs';
        i.color = '#F97C0C';
        i.size = inputs.length;
        singleBlockDataArray.push(i);
    });

   kernels.forEach(i => {
        i.group = 'kernels';
        i.color = '#FB576D';
        i.size = kernels.length;
        singleBlockDataArray.push(i);
    });

   outputs.forEach((i) => {
        i.group = 'outputs';
        i.color = '#2274AF';
        i.size = outputs.length;
        singleBlockDataArray.push(i);
    });

    const date = timestamp && new Date(timestamp.seconds * 1000).toLocaleString();

    return (
        <div className="SingleBlock">
            {blockFound ? (
                <div>
                    <SingleBlockViewHeader title="Block Data"/>
                    <ClusterGraph data={singleBlockDataArray} width={1000} height={400} />
                    <ProgressBar weight={blockWeight} maxWeight={maxBlockWeight}/>
                    <h1>Mining Details</h1>
                    <StatRow label="Timestamp" value={date} />
                    <h1>Technical Details</h1>
                    <StatRow label="Accumulated Monero Difficulty" value={accumulated_monero_difficulty} />
                    <StatRow label="Accumulated Blake Difficulty" value={accumulated_blake_difficulty} />
                    <StatRow label="Previous Hash" value={prev_hash} />
                    <StatRow label="Hash" value={hash} />
                    <StatRow label="Nonce" value={nonce} />
                    <StatRow label="Total Kernel Offset" value={total_kernel_offset} />
                    <StatRow label="Version" value={version} />
                </div>
            ) : (
                <h1 className="noBlockFound">No block found.</h1>
            )}
        </div>
    )
}

const mapStateToProps = (state) => ({
    block: state.block
});
export default connect(mapStateToProps)(SingleBlock);
