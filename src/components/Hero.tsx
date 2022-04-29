import React from 'react';
import './Hero.scss';
interface Props {
    children: React.ReactNode;
}
export default function Hero({ children }: Props) {
    return (
    <div className="hero-bg">
        <article className="hero blocksOverview max-container">{children}</article>
    </div>
    )
}
