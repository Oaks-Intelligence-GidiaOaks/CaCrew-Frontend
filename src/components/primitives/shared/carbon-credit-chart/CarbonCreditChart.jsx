import React, { useEffect, useState } from "react";
import "./CarbonCreditChart.scss";
import { scaleBand, scaleTime, scaleLinear, scalePoint } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { GridRows } from "@visx/grid";
import { Tooltip, useTooltip, withTooltip } from "@visx/tooltip";
import { LinearGradient } from "@visx/gradient";
import { ParentSize } from "@visx/responsive";
import { useGetChartDataQuery } from "services/transaction.service";

// sample data

const MyGradient = () => (
  <LinearGradient
    id="my-gradient"
    from="rgba(95, 65, 178, 0.17)"
    to="rgba(255, 255, 255, 0)"
    fromOffset="0%"
    toOffset="100%"
  />
);
const MyGradientSold = () => (
  <LinearGradient
    id="my-gradient-sold"
    from="rgba(95, 65, 178, 0.17)"
    to="rgba(255, 255, 255, 0)"
    fromOffset="0%"
    toOffset="100%"
  />
);
const MyGradientRetied = () => (
  <LinearGradient
    id="my-gradient-retired"
    from="rgba(95, 65, 178, 0.17)"
    to="rgba(255, 255, 255, 0)"
    fromOffset="0%"
    toOffset="100%"
  />
);

// let monthCount = [];

// data.forEach((item) => {
//   const month = item.date.toLocaleString("en-US", { month: "short" });
//   !monthCount.includes(month) && monthCount.push(month);
// });

// console.log(monthCount, "month");

// format date and value
const formatDate = (d) => d.toLocaleString("en-US", { month: "short" });
const formatValue = (v) => v.toFixed(2);

// render component
function LineChart(props) {
  // get parent width and height from props
  const { parentWidth, parentHeight, filter } = props;
  const { data: chartData } = useGetChartDataQuery();
  const usedChartData = chartData || [];
  // console.log(filter, "chart");

  // I create arrays to store the transformed data for each type
  const boughtData = [];
  const retiredData = [];
  const soldData = [];

  // I also created an array with month names
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // I then fill the boughtData, retiredData, and soldData arrays
  months.forEach((monthName, index) => {
    const info = usedChartData?.find((item) => item.monthName === monthName);

    boughtData.push({
      date: monthName,
      value: info ? info.buyAmount : 0,
    });

    retiredData.push({
      date: monthName,
      value: info ? info.retiredAmount : 0,
    });

    soldData.push({
      date: monthName,
      value: info ? info.sellAmount : 0,
    });
  });

  // Now you have the transformed data in the format you need
  // console.log("boughtData:", boughtData);
  // console.log("retiredData:", retiredData);
  // console.log("soldData:", soldData);

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
  // const xScale =  scaleTime({
  //   domain: [
  //     Math.min(...data.map((d) => d.date)),
  //     Math.max(...data.map((d) => d.date)),
  //   ],
  //   range: [margin.left, width - margin.right],
  // });

  // const yScale = scaleLinear({
  //   domain: [0, Math.max(...data.map((d) => d.value))],
  //   range: [height - margin.bottom, margin.top],
  // });

  // const xScale = scaleTime({
  //   domain: [
  //     Math.min(
  //       ...[...boughtData, ...retiredData, ...soldData].map((d) => d.date)
  //     ),
  //     Math.max(
  //       ...[...boughtData, ...retiredData, ...soldData].map((d) => d.date)
  //     ),
  //   ],
  //   range: [margin.left, width - margin.right],
  // });
  const xScale = scalePoint({
    domain: months,
    range: [margin.left, width - margin.right],
  });

  const yScale = scaleLinear({
    domain: [
      0,
      Math.max(
        ...[...boughtData, ...retiredData, ...soldData].map((d) => d.value)
      ),
    ],
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

        {filter.sold && (
          <LinePath
            data={soldData}
            x={(d) => xScale(d.date)}
            y={(d) => yScale(d.value)}
            stroke="#4277FF"
            strokeWidth={2}
            fill="url(#my-gradient)"
          />
        )}
        {filter.retired && (
          <LinePath
            data={retiredData}
            x={(d) => xScale(d.date)}
            y={(d) => yScale(d.value)}
            stroke="#FF5151"
            strokeWidth={2}
            fill="url(#my-gradient)"
          />
        )}
        {filter.bought && (
          <LinePath
            data={boughtData}
            x={(d) => xScale(d.date)}
            y={(d) => yScale(d.value)}
            stroke="#5F41B2"
            strokeWidth={2}
            fill="url(#my-gradient)"
          />
        )}
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
        {filter.sold && (
          <g>
            {soldData.map((d, i) => (
              <circle
                key={`point-${i}`}
                cx={xScale(d.date)}
                cy={yScale(d.value)}
                r={3}
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
        )}
        {filter.retired && (
          <g>
            {retiredData.map((d, i) => (
              <circle
                key={`point-${i}`}
                cx={xScale(d.date)}
                cy={yScale(d.value)}
                r={3}
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
        )}
        {filter.bought && (
          <g>
            {boughtData.map((d, i) => (
              <circle
                key={`point-${i}`}
                cx={xScale(d.date)}
                cy={yScale(d.value)}
                r={3}
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
        )}
      </svg>
      {tooltipOpen && (
        <Tooltip left={tooltipLeft} top={tooltipTop}>
          <div>
            <strong>Date:</strong> {tooltipData.date}
          </div>
          <div>
            <strong>Value:</strong> {formatValue(tooltipData.value) + " tcO2e"}
          </div>
        </Tooltip>
      )}
    </div>
  );
}

export const ChartFilter = ({ title, handleToggleFilter }) => {
  const [active, setActive] = useState();

  function getItemClassName(idx, activeIdx) {
    // if (idx === activeIdx) return "filter_chart_item_filtered";
    if (idx === 0) return "filter_chart_item_0";
    if (idx === 1) return "filter_chart_item_1";
    if (idx === 2) return "filter_chart_item_2";
  }

  return (
    <div className="filter_chart">
      <div className="filter_chart_text_wrap between">
        <div className="filter_chart_text start">
          <div className="filter_chart_text_title">{title}</div>
          <div className="filter_chart_text_history">History</div>
        </div>
        <div className="filter_chart_wrap start">
          {["bought", "sold", "retired"].map((item, idx) => (
            <div
              className={`center ${getItemClassName(idx, active)}`}
              key={idx}
              onClick={() => {
                setActive(idx);
                handleToggleFilter(item);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function CarbonCreditChart({ filter }) {
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
          filter={filter}
        />
      )}
    </ParentSize>
  );
}

export default withTooltip(CarbonCreditChart);
