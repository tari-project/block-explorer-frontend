import React from 'react';
import PolygonGraph from './Graphs/PolygonGraph';
import { NetworkDifficultyEstimatedHashes } from '../helpers/api';
import { connect } from 'react-redux';
interface Props {
    difficulties: NetworkDifficultyEstimatedHashes;
}

function EstimatedHashGraph({ difficulties }: Props) {
    const difficultyArray: any[] = [];
    difficulties.forEach((item, x) => {
        const { estimated_hash_rate: estimatedHashRate } = item;
        difficultyArray.push({ y: estimatedHashRate, x: x });
    });

    const yAxisLabel = 'difficulty';
    const xAxisLabel = 'height from tip';

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
