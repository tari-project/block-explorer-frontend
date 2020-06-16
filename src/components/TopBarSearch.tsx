import React, { useState } from 'react';
import { ReactComponent as Search } from '../assets/search.svg';
import loader from '../assets/searching-loader.gif';
import './TopBarSearch.css';
import { withRouter } from 'react-router-dom';

function TopBarSearch({ history }) {
    let timer;
    const [searching, setSearching] = useState(false);
    const id = history.location.pathname.split('/').pop();

    function handleKeyPress(e) {
        window.clearTimeout(timer);
        setSearching(true);
    }

    function handleKeyUp(e) {
        const searchValue = e.target.value;
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
            setSearching(false);
            redirect(searchValue);
        }, 2000);
    }

    function redirect(block) {
        block && (window.location.href = '/block/' + block);
    }

    return (
        <div className="TopBar-searchBar">
            <input
                type="text"
                defaultValue={id || ''}
                placeholder="Search for a specific block or transaction"
                onKeyPress={handleKeyPress}
                onKeyUp={handleKeyUp}
            />
            {searching ? (
                <img src={loader} className="searchBarLoader" alt="Searching for a specific block or transaction" />
            ) : (
                <Search className="searchBarIcon" />
            )}
        </div>
    );
}

export default withRouter(TopBarSearch);
