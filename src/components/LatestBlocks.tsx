import BlockCard from './BlockCard';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
function LatestBlocks({ blocks }: { blocks: any[] }) {
    const [latestBlocks, setLatestBlocks] = useState([] as any);
    useEffect(() => {
        blocks.sort((a, b) => b.block.header.height - a.block.header.height);
        setLatestBlocks(blocks);
    }, [blocks]);

    return (
        <div className="latestBlocksContainer">
            {latestBlocks.slice(0, 5).map((block, i) => (
                <BlockCard key={i} block={block} />
            ))}
        </div>
    );
}
const mapStateToProps = (state) => ({
    blocks: state.blocks
});
export default connect(mapStateToProps)(LatestBlocks);
