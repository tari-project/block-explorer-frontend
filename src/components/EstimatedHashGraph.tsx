import React from 'react';
import PolygonGraph from './Graphs/PolygonGraph';
import { NetworkDifficultyEstimatedHashes } from '../helpers/api';
import { connect } from 'react-redux';
import { MainData } from '../types/Data';

interface Props {
    difficulties: NetworkDifficultyEstimatedHashes;
}

function EstimatedHashGraph({ difficulties }: Props) {
    const difficultyArray: MainData[] = [];
    difficulties.forEach(function (item, index) {
        // exclude latest block since estimated hash rate will be zero
        if (index !== 0) {
            const { estimated_hash_rate: estimatedHashRate, height } = item;
            difficultyArray.push({ y: estimatedHashRate, x: +height });
        }
    });

    const yAxisLabel = 'estimated hash rate';
    const xAxisLabel = 'block height';

    return (
        <PolygonGraph
            data={difficultyArray}
            width={500}
            height={220}
            yAxisTicks={6}
            yAxisLabel={yAxisLabel}
            xAxisLabel={xAxisLabel}
        />
    );
}

const mapStateToProps = (state) => ({
    difficulties: state.difficulties
});
export default connect(mapStateToProps)(EstimatedHashGraph);
