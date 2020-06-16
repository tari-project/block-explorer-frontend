import React from 'react';
import './PlainGraphTitle.css';

interface Props {
    title: string;
    subTitle?: string;
}

export default function PlainGraphTitle({ title, subTitle }: Props) {
    return (
        <div className="graphTitleWithSub">
            <div className="graphTitle">{title}</div> <div className="graphSubtitle">{subTitle}</div>
        </div>
    );
}
