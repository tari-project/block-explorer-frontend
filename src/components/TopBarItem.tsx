import React from 'react';
import './TopBarItem.css';

interface Props {
    label: string;
    value: string;
    lowerCase?: boolean;
}

export default function TopBarItem({ label, value, lowerCase }: Props) {
    const lowerCaseClass = lowerCase ? 'lowerCase' : '';
    return (
        <div className="TopBarItem">
            <h3 className={lowerCaseClass}>{value}</h3>
            <h4>{label}</h4>
        </div>
    );
}
