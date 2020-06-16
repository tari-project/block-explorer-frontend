import React from 'react';
import './SingleBlockViewHeader.css';
import ColorMapItem from './ColorMapItem';

interface Props {
    title: string;
}

export default function SingleBlockViewHeader({ title }: Props) {
    return (
        <div className="singleBlockViewHeader">
            <h1>{title}</h1>
            <div className="colorMapping">
                <ColorMapItem title="Inputs" color="#F97C0D" />
                <ColorMapItem title="Outputs" color="#2274AF" />
                <ColorMapItem title="Kernels" color="#FB576D" />
            </div>
        </div>
    );
}
