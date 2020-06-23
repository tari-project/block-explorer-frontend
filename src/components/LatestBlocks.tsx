import BlockCard from './BlockCard';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { BlocksEntity } from '../types/Blocks';
import { ReactComponent as RightCaret } from '../assets/right-caret.svg';
import './BlockCard.css';

function LatestBlocks({ blocks }: { blocks: BlocksEntity[] }) {
    const container = useRef<HTMLDivElement>(null);
    const containerCurrent = container.current;
    const [latestBlocks, setLatestBlocks] = useState([] as BlocksEntity[]);
    useEffect(() => {
        blocks.sort((a, b) => b.block.header.height - a.block.header.height);
        setLatestBlocks(blocks as BlocksEntity[]);
    }, [blocks]);

    const [leftVal, setLeftVal] = useState(0);

    function scrollRight() {
        if (containerCurrent) {
            setLeftVal(leftVal + containerCurrent.clientWidth);
            containerCurrent.scroll({ top: 0, left: leftVal, behavior: 'smooth' });
            console.log(leftVal);
        }
    }

    return (
        <div className="latestBlocksAll">
            <div ref={container} className="latestBlocksContainer">
                {latestBlocks.map((block, i) => (
                    <BlockCard key={i} block={block} />
                ))}
            </div>
            <div className="clickScroll" onClick={scrollRight}>
                <RightCaret className="rightCaret" />
                <RightCaret className="rightCaret small" />
            </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    blocks: state.blocks
});
export default connect(mapStateToProps)(LatestBlocks);
