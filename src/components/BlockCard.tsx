import React from "react";
import "./BlockCard.css";
import BlockChart from "./BlockChart";

export default function BlockCard() {
  return (
    <div className="BlockCard">
      <Header blockHeight="103,574" date="05/05/2020 - 2:37PM" />
      <div className="BlockCard-chart">
        <BlockChart />
      </div>
      <div className="BlockCard-ticks">
        <div>0:00</div>
        <div>0:30</div>
        <div>1:00</div>
        <div>1:30</div>
        <div>1:48</div>
      </div>
      <div className="BlockCard-stats">
        <StatBox color="yellow" label="# of Transactions" value="135" />
        <StatBox color="blue" label="Mining Time" value="1:48" />
        <StatBox color="purple" label="Block Size" value="437kb" />
      </div>
    </div>
  );
}

interface HeaderProps {
  blockHeight: string;
  date: string;
}

function Header({ blockHeight, date }: HeaderProps) {
  return (
    <div className="BlockCard-Header">
      <h1>Block {blockHeight}</h1>
      <h2>{date}</h2>
    </div>
  );
}

type StatBoxColor = "yellow" | "blue" | "purple";

const statBoxColors: {
  [color in StatBoxColor]: {
    backgroundColor: string;
    color: string;
  };
} = {
  yellow: {
    backgroundColor: "#fceee4",
    color: "#bc9b84",
  },
  blue: {
    backgroundColor: "#e4f5fc",
    color: "#90aab4",
  },
  purple: {
    backgroundColor: "#fce4f6",
    color: "#b490ae",
  },
};

interface StatBoxProps {
  color: StatBoxColor;
  label: string;
  value: string;
}

function StatBox({ color, label, value }: StatBoxProps) {
  return (
    <div style={statBoxColors[color]} className="BlockCard-StatBox">
      <div className="BlockCard-StatBox-value">{value}</div>
      <div className="BlockCard-StatBox-label">{label}</div>
    </div>
  );
}
