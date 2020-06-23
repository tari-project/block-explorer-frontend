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

    const [leftVal, setLeftVal] = useState(0);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(true);

    const latestBlocksContainer: any = useRef(null);

    useEffect(() => {
        latestBlocksContainer.current.getElement();
        setLeftVal(latestBlocksContainer.current.getElement().clientWidth);
    }, []);

    function clickScroll(direction) {
        const element = latestBlocksContainer.current.getElement();
        if (latestBlocksContainer.current && direction === 'right') {
            //get left val for scroll to
            setLeftVal(leftVal + element.clientWidth);
            //scroll
            element.scrollTo({ top: 0, left: leftVal, behavior: 'smooth' });
        } else if (latestBlocksContainer.current && direction === 'left') {
            //get back!
            setLeftVal(leftVal - element.clientWidth);
            //scroll
            element.scrollTo({ top: 0, left: -leftVal, behavior: 'smooth' });
        }

        if (element.clientWidth === leftVal) {
            setShowLeft(true);
        } else {
            setShowLeft(false);
        }

        if (leftVal === element.scrollWidth) {
            setShowRight(false);
        } else {
            setShowRight(true);
        }
    }

    return (
        <div className="latestBlocksAll">
            {showLeft && (
                <div
                    className="clickScrollLeft"
                    onClick={() => {
                        clickScroll('left');
                    }}
                >
                    <RightCaret className="rightCaret" />
                    <RightCaret className="rightCaret small" />
                </div>
            )}
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
            {showRight && (
                <div
                    className="clickScroll"
                    onClick={() => {
                        clickScroll('right');
                    }}
                >
                    <RightCaret className="rightCaret" />
                    <RightCaret className="rightCaret small" />
                </div>
            )}
        </div>
    );
}
const mapStateToProps = (state) => ({
    blocks: state.blocks
});
export default connect(mapStateToProps)(LatestBlocks);
