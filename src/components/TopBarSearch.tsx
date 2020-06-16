import React, {useState} from 'react';
import { ReactComponent as Search } from '../assets/search.svg';
import loader from '../assets/searching-loader.gif';
import './TopBarSearch.css';
import { withRouter } from 'react-router-dom';

function TopBarSearch({ history }) {
    let timer;
    const [searching, setSearching] = useState(false);
    const id = history.location.pathname.split('/').pop();

    function onSearch(e) {
        const searchValue = e.target.value;
        setSearching(true);
        clearTimeout(timer);
        timer = setTimeout(() => {
            window.location.href = '/block/' + searchValue;
        }, 2000);
    }

    return (
        <div className="TopBar-searchBar">
            <input type="text" defaultValue={id || ''} placeholder="Search for a specific block or transaction" onKeyUp={onSearch} />
            {searching ? (
                <img src={loader} className="searchBarLoader" alt="Searching for a specific block or transaction" />
            ) : (
                <Search className="searchBarIcon" />
            )}
        </div>
    );
}

export default withRouter(TopBarSearch);
