import React from 'react';
import './ProgressBar.css';

interface Props {
    weight: any;
}

export default function ProgressBar({ weight }: Props) {
    return (
        <div className="ProgressBarContainer">
            <h3><strong>Weight: </strong> {weight}</h3>
            <progress value={weight} max="19500" />
        </div>
    );
}