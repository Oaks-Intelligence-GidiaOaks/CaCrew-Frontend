import React, { useState } from "react";
import "./CarbonCreditChart.scss";
import { scaleTime, scaleLinear } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { Tooltip, useTooltip, withTooltip } from "@visx/tooltip";
import { LinearGradient } from "@visx/gradient";
import { ParentSize } from "@visx/responsive";

// sample data
const data = [
  { date: new Date(2023, 0, 1), value: 10 },
  { date: new Date(2023, 1, 2), value: 20 },
  { date: new Date(2023, 2, 3), value: 10 },
  { date: new Date(2023, 3, 4), value: 5 },
  { date: new Date(2023, 4, 6), value: 9 },
  { date: new Date(2023, 5, 6), value: 30 },
  { date: new Date(2023, 6, 6), value: 10 },
  { date: new Date(2023, 7, 6), value: 15 },
  { date: new Date(2023, 8, 6), value: 50 },
  { date: new Date(2023, 9, 6), value: 33 },
  { date: new Date(2023, 10, 6), value: 28 },
  { date: new Date(2023, 11, 6), value: 16 },
];

const MyGradient = () => (
  <LinearGradient
    id="my-gradient"
    from="rgba(95, 65, 178, 0.17)"
    to="rgba(255, 255, 255, 0)"
    fromOffset="0%"
    toOffset="100%"
  />
);

let monthCount = [];

data.forEach((item) => {
  const month = item.date.toLocaleString("en-US", { month: "short" });
  !monthCount.includes(month) && monthCount.push(month);
});

console.log(monthCount, "month");

// format date and value
const formatDate = (d) => d.toLocaleString("en-US", { month: "short" });
const formatValue = (v) => v.toFixed(2);

// render component
function LineChart(props) {
  // get parent width and height from props
  const { parentWidth, parentHeight } = props;

  // calculate dimensions and margins based on parent size
  const margin = {
    top: Math.max(parentHeight * 0.05, 20),
    right: Math.max(parentWidth * 0.05, 50),
    bottom: Math.max(parentHeight * 0.1, 50),
    left: Math.max(parentWidth * 0.05, 50),
  };

  // const margin = { top: 20, right: 50, bottom: 50, left: 0 };
  const width =
    parentWidth > margin.left + margin.right
      ? parentWidth
      : margin.left + margin.right;
  const height =
    parentHeight > margin.top + margin.bottom
      ? parentHeight
      : margin.top + margin.bottom;

  // scales
  const xScale = scaleTime({
    domain: [
      Math.min(...data.map((d) => d.date)),
      Math.max(...data.map((d) => d.date)),
    ],
    range: [margin.left, width - margin.right],
  });

  const yScale = scaleLinear({
    domain: [0, Math.max(...data.map((d) => d.value))],
    range: [height - margin.bottom, margin.top],
  });

  // tooltip handler
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
    // updateTooltip,
  } = useTooltip();

  return (
    <div className="carbon_chart">
      <svg width={width} height={height}>
        <MyGradient />
        <GridRows
          scale={yScale}
          width={width - margin.left - margin.right}
          left={margin.left}
          numTicks={4}
          // strokeDasharray="2,2"
        />
        <LinePath
          data={data}
          x={(d) => xScale(d.date)}
          y={(d) => yScale(d.value)}
          stroke="#5F41B2"
          strokeWidth={2}
          fill="url(#my-gradient)"
        />
        <AxisLeft
          scale={yScale}
          left={margin.left}
          hideAxisLine
          hideTicks
          numTicks={4}
          tickLabelProps={() => ({
            fontSize: 12,
            fontWeight: 400,
            fill: "#4C5563",
            textAnchor: "end",
            verticalAnchor: "middle",
            fontFamily: "DM Sans",
          })}
        />
        <AxisBottom
          scale={xScale}
          top={height - margin.bottom}
          tickFormat={formatDate}
          hideAxisLine
          hideTicks
          numTicks={11}
          tickLabelProps={() => ({
            fontSize: 12,
            fontWeight: 400,
            fill: "#4C5563",
            verticalAnchor: "start",
            fontFamily: "DM Sans",
          })}
        />
        <g>
          {data.map((d, i) => (
            <circle
              key={`point-${i}`}
              cx={xScale(d.date)}
              cy={yScale(d.value)}
              r={4}
              fill="white"
              stroke="#5F41B2"
              strokeWidth={1}
              onMouseOver={() =>
                showTooltip({
                  tooltipData: d,
                  tooltipLeft: xScale(d.date),
                  tooltipTop: yScale(d.value),
                })
              }
              onMouseOut={() => hideTooltip()}
            />
          ))}
        </g>
      </svg>
      {tooltipOpen && (
        <Tooltip left={tooltipLeft} top={tooltipTop}>
          <div>
            <strong>Date:</strong> {tooltipData.date.toLocaleDateString()}
          </div>
          <div>
            <strong>Value:</strong> {formatValue(tooltipData.value)}
          </div>
        </Tooltip>
      )}
    </div>
  );
}

export const ChartFilter = () => {
  const [active, setSctive] = useState(3);

  const handleActive = (idx) => {
    setSctive(idx);
  };
  return (
    <div className="filter_chart">
      <div className="filter_chart_text_wrap between">
        <div className="filter_chart_text start">
          <div className="filter_chart_text_title">Carbon Credit Overview</div>
          <div className="filter_chart_text_history">History</div>
        </div>
        <div className="filter_chart_wrap start">
          {["3M", "6M", "9M", "1Y"].map((item, idx) => (
            <div className={`filter_chart_item center ${active === idx && "filter_chart_item_active"}`} key={item} onClick={() => handleActive(idx)}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function CarbonCreditChart() {
  return (
    <ParentSize>
      {(parent) => (
        <LineChart
          parentWidth={parent.width}
          parentHeight={parent.height}
          parentTop={parent.top}
          parentLeft={parent.left}
          parentRef={parent.ref}
          resizeParent={parent.resize}
        />
      )}
    </ParentSize>
  );
}

export default withTooltip(CarbonCreditChart);
