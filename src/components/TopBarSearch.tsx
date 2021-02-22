import React, { useEffect, useState } from 'react';
import { ReactComponent as Search } from '../assets/search.svg';
import loader from '../assets/searching-loader.gif';
import './TopBarSearch.scss';
import { withRouter } from 'react-router-dom';

function TopBarSearch({ history }: { history: any }) {
    let timer;
    const [searching, setSearching] = useState(false);
    const [id, setId] = useState('');

    useEffect(() => {
        const { pathname } = history.location;
        setId(pathname.split('/').pop());
    }, [history.location]);

    function handleKeyPress(e) {
        window.clearTimeout(timer);
        setSearching(true);
    }

    function redirect(idOrHash) {
        idOrHash = idOrHash.trim();
        idOrHash && (window.location.href = '/block/' + idOrHash);
    }

    function handleKeyUp(e) {
        const searchValue = e.target.value;
        window.clearTimeout(timer);
        timer = window.setTimeout(() => {
            setSearching(false);
            redirect(searchValue);
        }, 2000);
    }

    return (
        <div className="TopBar-searchBar">
            <input
                type="text"
                defaultValue={id || ''}
                placeholder="Search for a block by height or hash"
                onKeyPress={handleKeyPress}
                onKeyUp={handleKeyUp}
            />
            {searching ? (
                <img src={loader} className="searchBarLoader" alt="Searching for a block by height or hash" />
            ) : (
                <Search className="searchBarIcon" />
            )}
        </div>
    );
}

export default withRouter(TopBarSearch);
