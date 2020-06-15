import React, {useEffect, useState} from 'react';
import './SingleBlock.css';
import {
    useParams
} from "react-router-dom";
import {Constants, fetchConstants, fetchSingleBlock} from "../helpers/api";
import StatRow from "./SingleBlock/StatRow";
import SingleBlockViewHeader from "./SingleBlock/SingleBlockViewHeader";
import { connect } from 'react-redux';
import ProgressBar from "./SingleBlock/ProgressBar";
import ClusterGraph from "./Graphs/ClusterGraph";
import {Block, BlocksEntity, Body, Header, Pow} from "../helpers/Blocks";

interface Props {
    block: BlocksEntity[];
}

function SingleBlock({ block }: Props) {

    const { id } = useParams();

    const [singleBlock, setSingleBlock] = useState({} as Block);
    const [blockHeader, setblockHeader] = useState({} as Header);
    const [blockPow, setblockPow] = useState({} as Pow);
    const [blockBody, setblockBody] = useState({} as Body);
    const [constants, setConstants] = useState({} as Constants);

    useEffect(() => {
        try {
            id && fetchSingleBlock(id).then((block) => {
                if(block && block.block) {
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

    useEffect(() => {
        try {
            id && fetchConstants().then((constants: Constants) => {
                setConstants(constants as Constants);
            });
        } catch (e) {
            console.error(e);
        }
    }, [id]);

    const singleBlockDataArray: any[] = [];

    const { hash, prev_hash, nonce, total_kernel_offset, version, timestamp } = blockHeader;
    const { accumulated_monero_difficulty, accumulated_blake_difficulty } = blockPow;
    const { inputs = [], kernels = [], outputs =[] } = blockBody;

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
    const { _weight } = singleBlock;
    const { max_block_transaction_weight } = constants;

    return (
        <div className="SingleBlock">
            {blockBody ? (
                <div>
                    <SingleBlockViewHeader title="Block Data"/>
                    <ClusterGraph data={singleBlockDataArray} width={1000} height={400} />
                    <ProgressBar weight={_weight} maxWeight={max_block_transaction_weight}/>
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
