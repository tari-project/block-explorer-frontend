import React from 'react';
import PolygonGraph from "./Graphs/PolygonGraph";

interface Props {
    data: any[];
}

export default function EstimatedHashGraph({ data } : Props) {
    let difficultyArray: any[] = [];
    data.map((item, x) => {
        const { estimated_hash_rate } = item;
        return difficultyArray.push({y: estimated_hash_rate, x: x});
    });

    return (
        <PolygonGraph data={difficultyArray} width={500} height={220} yAxisTicks={6}/>
    );
}