import React, { useCallback, useEffect, useState } from 'react';
import { fetchTokensInCirculation } from '../helpers/api';
import { TokensInCirculation } from '../types/Data';
import SimpleBarGraph from './Graphs/SimpleBarGraph';

export default function CirculatingTokenGraph() {
    const [totalTokens, setTotalTokens] = useState<number[]>([]);

    const loadCirculationData = useCallback(async () => {
        const tokenData = await fetchTokensInCirculation();
        const totalsArr: number[] = [];

        tokenData.map((token: TokensInCirculation) => {
            const { totalTokensInCirculation } = token;
            return totalsArr.push(totalTokensInCirculation);
        });

        setTotalTokens(totalsArr);
    }, []);

    useEffect(() => {
        loadCirculationData();
    }, [loadCirculationData]);

    return <SimpleBarGraph width={500} height={220} yAxisTicks={6} data={totalTokens} />;
}
