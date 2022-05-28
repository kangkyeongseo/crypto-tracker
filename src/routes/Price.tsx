import ApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "./api";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Price() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              data: data?.map((value) => {
                return [
                  Date.parse(value.time_open),
                  value.open,
                  value.high,
                  value.low,
                  value.close,
                ];
              }) as any,
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "rgba(0,0,0,0.5)",
            },
            xaxis: {
              categories: data?.map((date) => date.time_close),
              type: "datetime",
            },
            yaxis: {
              labels: {
                formatter: function (y) {
                  return "$" + y.toFixed(2);
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Price;
