import React from 'react';
import { ReactComponent as Search } from '../assets/search.svg';

import './TopBarSearch.css';

export default function TopBarSearch() {
    return (
        <div className="TopBar-searchBar">
            <input type="text" placeholder="Search for a specific block or transaction" />
            <Search className="searchBarIcon" />
        </div>
    );
}
