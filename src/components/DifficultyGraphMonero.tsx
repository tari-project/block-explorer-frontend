import React from 'react';
import MultiLinePlotMonero from './Graphs/MultiLinePlotMonero';
import { NetworkDifficultyEstimatedHashes } from '../helpers/api';
import { connect } from 'react-redux';
interface Props {
    difficulties: NetworkDifficultyEstimatedHashes;
}

function DifficultyGraphMonero({ difficulties }: Props) {
    const difficultyArray: any[] = [];
    difficulties.forEach(function (item) {
        const { difficulty, height, pow_algo } = item;
        difficultyArray.push({ y: difficulty, x: +height, group: pow_algo });
    });
    const yAxisLabel = 'target difficulty';
    const xAxisLabel = 'block height';

    return (
        <MultiLinePlotMonero
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
export default connect(mapStateToProps)(DifficultyGraphMonero);
