import React from 'react';
import ClusterGraph from "./Graphs/ClusterGraph";

interface Props {
    data: any;
}

export default function BlockBody({ data }: Props) {

    const singleBlockDataArray: any[] = [];

    for (let i in data) {
        if (data.hasOwnProperty(i)) {
            let items = data[i];
            for (let j in items) {
                // inputs, kernels, outputs
                if (data[i].hasOwnProperty(j)) {
                    let children = data[i][j];
                    for (let k in children) {
                        // inputs[0], inputs[1] etc
                        if (data[i][j].hasOwnProperty(k)) {
                            let child = data[i][j][k];
                            child.group = j;
                            child.size = data[i][j].length;
                            child.color = j === 'inputs' ? '#F97C0D' : j === 'kernels' ? '#FB576D' : '#2274AF';
                            singleBlockDataArray.push(child);
                        }
                    }
                }
            }
        }
    }

    for (let i = 0; i < singleBlockDataArray.length; i++) {
        singleBlockDataArray[i].id = i;
    }

    return (
        <ClusterGraph data={singleBlockDataArray} width={800} height={400} />
    )
}