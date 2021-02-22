import React from 'react';
import './Hero.scss';
interface Props {
    children: any;
}
export default function Hero({ children }: Props) {
    return <div className="hero">{children}</div>;
}
