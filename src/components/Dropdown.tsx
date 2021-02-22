import React from 'react';
import './Dropdown.scss';

export default function Dropdown() {
    return (
        <select className="select-css">
            <option>Last 6 Months</option>
            <option>Last 3 Months</option>
            <option>Last Month</option>
            <option>This Month</option>
        </select>
    );
}
