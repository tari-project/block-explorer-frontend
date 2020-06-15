import React from 'react';
import { ReactComponent as Search } from '../assets/search.svg';

import './TopBarSearch.css';

export default function TopBarSearch() {
    let id;

    function onChange(e) {
        const searchValue = e.target.value;
        if(searchValue) {
            window.location.href = '/block/' + searchValue;
        }
    }

    if(document.URL.indexOf("block") >= 0){
        id = window.location.pathname.split("/").pop();
    }

    return (
        <div className="TopBar-searchBar">
            <input type="text" value={id && id} placeholder="Search for a specific block or transaction" onChange={onChange}/>
            <Search className="searchBarIcon"/>
        </div>
    );
}
