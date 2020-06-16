import React from 'react';
import './StatRow.css';

interface StatProps {
    label: string;
    value: any;
}

export default function StatRow({ label, value }: StatProps) {
    return (
        <div className="StatBox-Row">
            <div>{label}</div>
            <div className="Stat-value">{value}</div>
        </div>
    );
}
