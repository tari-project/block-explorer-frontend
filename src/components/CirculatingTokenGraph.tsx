import React, { useCallback, useEffect, useState } from 'react';
import { fetchTokensInCirculation } from '../helpers/api';
import SimpleBarGraph from './Graphs/SimpleBarGraph';

export default function CirculatingTokenGraph() {
    const [totalTokens, setTotalTokens] = useState<number[]>([]);

    const loadCirculationData = useCallback(async () => {
        const tokenData = await fetchTokensInCirculation();
        const totalsArr = tokenData.map((d) => d.tokensInCirculation);

        setTotalTokens(totalsArr);
    }, []);

    useEffect(() => {
        loadCirculationData();
    }, []);

    return <SimpleBarGraph width={500} height={220} yAxisTicks={6} data={totalTokens} />;
}
