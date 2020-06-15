import React from 'react';
import { ReactComponent as Search } from '../assets/search.svg';

import './TopBarSearch.css';

export default function TopBarSearch({ match }) {
const { id } = match;
    let id, timer;

    function onChange(e) {
        const searchValue = e.target.value;
        clearTimeout(timer);
        timer = setTimeout((e) => {
            if(searchValue) {
                window.location.href = '/block/' + searchValue;
            }
        }, 1000);
    }

    if(document.URL.indexOf("block") >= 0){
        id = window.location.pathname.split("/").pop();
    }

    return (
        <div className="TopBar-searchBar">
            <input type="text" defaultValue={id || ''} placeholder="Search for a specific block height or hash" onKeyUp={onChange}/>
            <Search className="searchBarIcon"/>
        </div>
    );
}
