import React from 'react';
import './TopBarItem.css';

interface Props {
    label: string;
    value: string;
}

export default function TopBarItem({ label, value }: Props) {
    return (
        <div className="TopBarItem">
            <h3>{value}</h3>
            <h4>{label}</h4>
        </div>
    );
}
