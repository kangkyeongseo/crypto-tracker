import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { getCoinTicker, ICointickers } from "../api";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;

const Loading = styled.h3``;

const Box = styled.div<{ fontColor: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.textColor};
  padding: 20px 0px;
  border-radius: 10px;
  span:first-child {
    font-size: 18px;
  }
  span:nth-child(2) {
    font-size: 12px;
    margin: 10px 0px;
  }
  span:last-child {
    font-size: 24px;
    color: ${(props) => props.fontColor};
  }
`;

export interface IOutletContext {
  coinId: string;
}

function Price() {
  const { coinId } = useOutletContext<IOutletContext>();
  const { data, isLoading } = useQuery<ICointickers>(["price", coinId], () =>
    getCoinTicker(coinId)
  );
  return (
    <>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <Wrapper>
          <Box
            fontColor={
              data?.quotes.USD.percent_change_15m === undefined
                ? ""
                : data?.quotes.USD.percent_change_15m < 0
                ? "red"
                : "#3498db"
            }
          >
            <span>Percent Change</span>
            <span>[15m]</span>
            <span>{data?.quotes.USD.percent_change_15m}</span>
          </Box>
          <Box
            fontColor={
              data?.quotes.USD.percent_change_30m === undefined
                ? ""
                : data?.quotes.USD.percent_change_30m < 0
                ? "red"
                : "#3498db"
            }
          >
            <span>Percent Change</span>
            <span>[30m]</span>
            <span>{data?.quotes.USD.percent_change_30m}</span>
          </Box>
          <Box
            fontColor={
              data?.quotes.USD.percent_change_1h === undefined
                ? ""
                : data?.quotes.USD.percent_change_1h < 0
                ? "red"
                : "#3498db"
            }
          >
            <span>Percent Change</span>
            <span>[1h]</span>
            <span>{data?.quotes.USD.percent_change_1h}</span>
          </Box>
          <Box
            fontColor={
              data?.quotes.USD.percent_change_12h === undefined
                ? ""
                : data?.quotes.USD.percent_change_12h < 0
                ? "red"
                : "#3498db"
            }
          >
            <span>Percent Change</span>
            <span>[12h]</span>
            <span>{data?.quotes.USD.percent_change_12h}</span>
          </Box>
          <Box
            fontColor={
              data?.quotes.USD.percent_change_24h === undefined
                ? ""
                : data?.quotes.USD.percent_change_24h < 0
                ? "red"
                : "#3498db"
            }
          >
            <span>Percent Change</span>
            <span>[24h]</span>
            <span>{data?.quotes.USD.percent_change_24h}</span>
          </Box>
          <Box
            fontColor={
              data?.quotes.USD.percent_change_7d === undefined
                ? ""
                : data?.quotes.USD.percent_change_7d < 0
                ? "red"
                : "#3498db"
            }
          >
            <span>Percent Change</span>
            <span>[7d]</span>
            <span>{data?.quotes.USD.percent_change_7d}</span>
          </Box>
          <Box
            fontColor={
              data?.quotes.USD.percent_change_30d === undefined
                ? ""
                : data?.quotes.USD.percent_change_30d < 0
                ? "red"
                : "#3498db"
            }
          >
            <span>Percent Change</span>
            <span>[30d]</span>
            <span>{data?.quotes.USD.percent_change_30d}</span>
          </Box>
          <Box
            fontColor={
              data?.quotes.USD.percent_change_1y === undefined
                ? ""
                : data?.quotes.USD.percent_change_1y < 0
                ? "red"
                : "#3498db"
            }
          >
            <span>Percent Change</span>
            <span>[1y]</span>
            <span>{data?.quotes.USD.percent_change_1y}</span>
          </Box>
        </Wrapper>
      )}
    </>
  );
}

export default Price;
