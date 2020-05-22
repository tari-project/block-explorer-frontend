import React from "react";
import "./GraphHeader.css";
import PlainGraphTitle from "./GraphTitles/PlainGraphTitle";
import Dropdown from "./Dropdown";

export default function GraphHeader() {
    return (
        <div className="graphHeaderContainer">
        <PlainGraphTitle
            title="Circulating Tari"
            subTitle="Total number of mined Tari circulating on the network."
        />
        <Dropdown/>
        </div>
    );
}