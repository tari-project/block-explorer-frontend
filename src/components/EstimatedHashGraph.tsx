import React from 'react';
import PolygonGraph from './Graphs/PolygonGraph';
import { NetworkDifficultyEstimatedHashes } from '../helpers/api';
import { connect } from 'react-redux';
interface Props {
    difficulties: NetworkDifficultyEstimatedHashes;
}

function EstimatedHashGraph({ difficulties }: Props) {
    const difficultyArray: any[] = [];
    difficulties.forEach(function (item, index, array) {
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
            data={difficultyArray as any[]}
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
