import React from 'react';
import './ProgressBar.css';

interface Props {
    weight: any;
    maxWeight: number;
}

export default function ProgressBar({ weight, maxWeight }: Props) {
    return (
        <div className="ProgressBarContainer">
            <h3><strong>Weight: </strong> {weight} / {maxWeight}</h3>
            <progress value={weight} max={maxWeight} />
        </div>
    );
}