import React from 'react';
import './SingleBlockViewHeader.scss';
import ColorMapItem from './ColorMapItem';

interface Props {
    title: string;
}

export default function SingleBlockViewHeader({ title }: Props) {
    return (
        <div className="singleBlockViewHeader">
            <h1>{title}</h1>
            <div className="colorMapping">
                <ColorMapItem title="Inputs" className="inputs" />
                <ColorMapItem title="Outputs" className="outputs" />
                <ColorMapItem title="Kernels" className="kernels" />
            </div>
        </div>
    );
}
