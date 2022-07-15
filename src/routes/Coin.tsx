import { useQuery } from "react-query";
import {
  useLocation,
  useParams,
  Outlet,
  Link,
  useMatch,
} from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getCoinInfo, getCoinTicker, ICoinInfo, ICointickers } from "../api";
import { isDarkAtom } from "./atoms";

const Header = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 30px;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-transform: uppercase;
`;

const HomeBtn = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  padding: 10px;
  border-radius: 50%;
  transition: all 0.2s linear;
  cursor: pointer;
  :hover {
    transform: scale(1.05);
  }
  svg {
    width: 25px;
    fill: ${(props) => props.theme.textColor};
  }
`;

const ModeBtn = styled(HomeBtn)``;

const Loading = styled.div`
  text-align: center;
  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.bgColor};
  padding: 20px 15px;
  border-radius: 45px;
  margin-bottom: 30px;
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  background-color: ${(props) => props.theme.textColor};
  padding: 30px 10px;
  border-radius: 30px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;
  span:first-child {
    margin-bottom: 10px;
    font-size: 20px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
  color: ${(props) => props.theme.textColor};
  padding: 0px 10px;
`;

const Supply = styled(Head)`
  grid-template-columns: repeat(2, 1fr);
`;

const Taps = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0px;
`;

const Tap = styled.div<{ isActive: boolean }>`
  width: 100%;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.bgColor};
  margin: 0px 5px;
  padding: 10px 30px;
  border-radius: 30px;
  text-align: center;
  transition: all 0.2s linear;
  :hover {
    color: ${(props) => props.theme.accentColor};
  }
`;

interface IState {
  name: string;
}

function Coin() {
  const { coinId } = useParams();
  const location = useLocation();
  const state = location.state as IState;
  const { data: infoData, isLoading: infoLoading } = useQuery<ICoinInfo>(
    ["info", coinId],
    () => getCoinInfo(coinId!)
  );
  const { data: tickerData, isLoading: tickerLoading } = useQuery<ICointickers>(
    ["ticker", coinId],
    () => getCoinTicker(coinId!)
  );
  const loading = infoLoading || tickerLoading;
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);
  const onClick = () => setIsDark((prev) => !prev);
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  return (
    <>
      <Header>
        <HeaderContent>
          <HomeBtn>
            <Link to="/">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" />
              </svg>
            </Link>
          </HomeBtn>
        </HeaderContent>
        <HeaderContent>
          <Title>
            {state?.name ? state.name : loading ? "" : infoData?.name}
          </Title>
        </HeaderContent>
        <HeaderContent>
          <ModeBtn onClick={onClick}>
            {!isDark ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 159.1c-53.02 0-95.1 42.98-95.1 95.1S202.1 351.1 256 351.1s95.1-42.98 95.1-95.1S309 159.1 256 159.1zM509.3 347L446.1 255.1l63.15-91.01c6.332-9.125 1.104-21.74-9.826-23.72l-109-19.7l-19.7-109c-1.975-10.93-14.59-16.16-23.72-9.824L256 65.89L164.1 2.736c-9.125-6.332-21.74-1.107-23.72 9.824L121.6 121.6L12.56 141.3C1.633 143.2-3.596 155.9 2.736 164.1L65.89 256l-63.15 91.01c-6.332 9.125-1.105 21.74 9.824 23.72l109 19.7l19.7 109c1.975 10.93 14.59 16.16 23.72 9.824L256 446.1l91.01 63.15c9.127 6.334 21.75 1.107 23.72-9.822l19.7-109l109-19.7C510.4 368.8 515.6 356.1 509.3 347zM256 383.1c-70.69 0-127.1-57.31-127.1-127.1c0-70.69 57.31-127.1 127.1-127.1s127.1 57.3 127.1 127.1C383.1 326.7 326.7 383.1 256 383.1z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z" />
              </svg>
            )}
          </ModeBtn>
        </HeaderContent>
      </Header>
      <Wrapper>
        {loading ? (
          <Loading>Loading...</Loading>
        ) : (
          <>
            <Head>
              <Content>
                <span>Rank</span>
                <span>{infoData?.rank}</span>
              </Content>
              <Content>
                <span>Symbol</span>
                <span>{infoData?.symbol}</span>
              </Content>
              <Content>
                <span>price</span>
                <span>{tickerData?.quotes.USD.price.toFixed(3)}</span>
              </Content>
            </Head>
            <Description>{infoData?.description}</Description>
            <Supply>
              <Content>
                <span>Total Supply</span>
                <span>{tickerData?.total_supply}</span>
              </Content>
              <Content>
                <span>Max Supply</span>
                <span>{tickerData?.max_supply}</span>
              </Content>
            </Supply>
            <Taps>
              <Tap isActive={priceMatch !== null}>
                <Link to="price">Price</Link>
              </Tap>
              <Tap isActive={chartMatch !== null}>
                <Link to="chart">Chart</Link>
              </Tap>
            </Taps>
            <Outlet context={{ coinId }} />
          </>
        )}
      </Wrapper>
    </>
  );
}

export default Coin;
