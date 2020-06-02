import React from "react";
import "./GraphHeader.css";
import PlainGraphTitle from "./GraphTitles/PlainGraphTitle";
import Dropdown from "./Dropdown";

interface Props {
    title: string;
    subTitle: string;
}

export default function GraphHeader({title, subTitle}: Props) {
    return (
        <div className="graphHeaderContainer">
        <PlainGraphTitle
            title={title}
            subTitle={subTitle}
        />
        <Dropdown/>
        </div>
    );
}