import React from 'react';
import { ReactComponent as Search } from '../assets/search.svg';
import './TopBarSearch.css';
import { withRouter } from 'react-router-dom';

function TopBarSearch({ history }) {
    let timer;
    const id = history.location.pathname.split('/').pop();

    function onChange(e) {
        const searchValue = e.target.value;
        clearTimeout(timer);
        timer = setTimeout((e) => {
            if(searchValue) {
                window.location.href = '/block/' + searchValue;
            }
        }, 1000);
    }

    return (
        <div className="TopBar-searchBar">
            <input type="text" placeholder="Search for a specific block or transaction" onKeyUp={onChange} />
            <Search className="searchBarIcon" />
        </div>
    );
}

export default withRouter(TopBarSearch);
