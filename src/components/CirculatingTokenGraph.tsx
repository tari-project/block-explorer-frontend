import React, { useCallback, useEffect, useState } from 'react';
import { fetchTokensInCirculation } from '../helpers/api';
import SimpleBarGraph from './Graphs/SimpleBarGraph';

export default function CirculatingTokenGraph() {
    const [totalTokens, setTotalTokens] = useState(([] as unknown) as any);

    const loadCirculationData = useCallback(async () => {
        const tokenData = await fetchTokensInCirculation();
        const totalsArr: number[] = [];

        tokenData.map((token) => {
            const { tokensInCirculation } = token;
            return totalsArr.push(tokensInCirculation);
        });

        setTotalTokens(totalsArr);
    }, []);

    useEffect(() => {
        loadCirculationData();
    }, [loadCirculationData]);

    return <SimpleBarGraph width={500} height={220} yAxisTicks={6} data={totalTokens} />;
}
