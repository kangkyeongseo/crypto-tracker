import { useQuery } from "react-query";
import { Link, Outlet } from "react-router-dom";
import { useMatch } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "./api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: flex-end;
    margin-left: 10px;
    color: ${(props) => props.theme.accentColor};
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OvervireItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Taps = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tap = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface RouteState {
  name: string;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams();
  const location = useLocation();
  const state = location.state as RouteState;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId!)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId!),
    {
      refetchInterval: 5000,
    }
  );
  /*   const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<IInfoData>();
  const [priceInfo, setPriceInfo] = useState<IPriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]); */
  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "Loading" : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Link to={"/"}>◀︎ Home</Link>
        <Title>
          {state?.name ? state.name : loading ? "Loading" : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OvervireItem>
              <span>Rank</span>
              <span>{infoData?.rank}</span>
            </OvervireItem>
            <OvervireItem>
              <span>Symbol</span>
              <span>${infoData?.symbol}</span>
            </OvervireItem>
            <OvervireItem>
              <span>Price</span>
              <span>${tickersData?.quotes.USD.price.toFixed(2)}</span>
            </OvervireItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OvervireItem>
              <span>Total Suply</span>
              <span>{tickersData?.total_supply}</span>
            </OvervireItem>
            <OvervireItem>
              <span>Max Supply</span>
              <span>{tickersData?.max_supply}</span>
            </OvervireItem>
          </Overview>
          <Taps>
            <Tap isActive={chartMatch !== null}>
              <Link to="chart">Chart</Link>
            </Tap>
            <Tap isActive={priceMatch !== null}>
              <Link to="price">Price</Link>
            </Tap>
          </Taps>
        </>
      )}
      <Outlet context={{ coinId }} />
    </Container>
  );
}

export default Coin;
