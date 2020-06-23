import BlockCard from './BlockCard';
import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { BlocksEntity } from '../types/Blocks';
import { ReactComponent as RightCaret } from '../assets/right-caret.svg';
import './BlockCard.css';
import ScrollContainer from 'react-indiana-drag-scroll';

function LatestBlocks({ blocks }: { blocks: BlocksEntity[] }) {
    const [latestBlocks, setLatestBlocks] = useState([] as BlocksEntity[]);
    useEffect(() => {
        blocks.sort((a, b) => b.block.header.height - a.block.header.height);
        setLatestBlocks(blocks as BlocksEntity[]);
    }, [blocks]);

    const [leftVal, setLeftVal] = useState(1000);

    const latestBlocksContainer: any = useRef(null);

    useEffect(() => {
        latestBlocksContainer.current.getElement();
        console.log(latestBlocksContainer);
    }, []);

    function clickScroll(direction) {
        if (latestBlocksContainer.current && direction === 'right') {
            setLeftVal(leftVal + latestBlocksContainer.current.getElement().clientWidth);
            latestBlocksContainer.current.getElement().scrollTo({ top: 0, left: leftVal, behavior: 'smooth' });
            console.log(leftVal);
        }
    }

    return (
        <div className="latestBlocksAll">
            <ScrollContainer
                className="latestBlocksContainer"
                hideScrollbars={false}
                vertical={false}
                ref={latestBlocksContainer}
            >
                {latestBlocks.map((block, i) => (
                    <BlockCard key={i} block={block} />
                ))}
            </ScrollContainer>
            <div
                className="clickScroll"
                onClick={() => {
                    clickScroll('right');
                }}
            >
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
