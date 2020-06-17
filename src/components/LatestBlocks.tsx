import BlockCard from './BlockCard';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BlocksEntity } from '../types/Blocks';
function LatestBlocks({ blocks }: { blocks: BlocksEntity[] }) {
    const [latestBlocks, setLatestBlocks] = useState([] as BlocksEntity[]);
    useEffect(() => {
        blocks.sort((a, b) => b.block.header.height - a.block.header.height);
        setLatestBlocks(blocks as BlocksEntity[]);
    }, [blocks]);

    return (
        <div className="latestBlocksContainer">
            {latestBlocks.map((block, i) => (
                <BlockCard key={i} block={block} />
            ))}
        </div>
    );
}
const mapStateToProps = (state) => ({
    blocks: state.blocks
});
export default connect(mapStateToProps)(LatestBlocks);
