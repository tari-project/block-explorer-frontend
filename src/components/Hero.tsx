import React from 'react';
import './Hero.scss';
interface Props {
    children: React.ReactNode;
}
export default function Hero({ children }: Props) {
    return <article className="hero blocksOverview">{children}</article>;
}
