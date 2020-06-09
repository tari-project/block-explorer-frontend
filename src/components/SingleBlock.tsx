import React, {useEffect, useState} from 'react';
import './SingleBlock.css';
import ClusterGraph from "./Graphs/ClusterGraph";
import {
    useParams
} from "react-router-dom";
import {fetchBlocksData} from "../helpers/api";
import StatRow from "./SingleBlock/StatRow";
import BlockBody from "./BlockBody";

export default function SingleBlock() {

    let { id } = useParams();

    const [blockHeader, setblockHeader] = useState(([] as unknown) as any);
    const [blockPow, setblockPow] = useState(([] as unknown) as any);
    const [blockBody, setblockBody] = useState(([] as unknown) as any);

    useEffect(() => {
        try {
            fetchBlocksData(1, "asc", Number(id)).then((blockData) => {
                blockData.blocks.map((data) => {
                    setblockHeader(data.block.header);
                    setblockPow(data.block.header.pow);
                    setblockBody(data.block.body);
                    return;
                });
            });
        } catch (e) {
            console.error(e);
        }
    }, []);

    const singleBlockDataArray: any[] = [];

    const { hash, prev_hash, nonce, total_kernel_offset, version } = blockHeader;
    const { accumulated_monero_difficulty, accumulated_blake_difficulty } = blockPow;
    const { inputs, kernels, outputs } = blockBody;

    singleBlockDataArray.push({inputs, kernels, outputs});

    return (
        <div className="SingleBlock">
            <BlockBody data={singleBlockDataArray}/>
            <h1>Technical Details</h1>
            <StatRow label="Accumulated Monero Difficulty" value={accumulated_monero_difficulty} />
            <StatRow label="Accumulated Blake Difficulty" value={accumulated_blake_difficulty} />
            <StatRow label="Previous Hash" value={prev_hash} />
            <StatRow label="Hash" value={hash} />
            <StatRow label="Nonce" value={nonce} />
            <StatRow label="Total Kernel Offset" value={total_kernel_offset} />
            <StatRow label="Version" value={version} />
        </div>
    )
}