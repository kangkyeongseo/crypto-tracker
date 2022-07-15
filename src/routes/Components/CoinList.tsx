import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.theme.textColor};
  padding: 10px 10px;
  border-radius: 35px;
  margin-bottom: 15px;
  transition: all 0.2s linear;
  :hover {
    transform: scale(1.02);
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
      rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
    color: ${(props) => props.theme.accentColor};
  }
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.img`
  width: 50px;
  margin-right: 10px;
`;

const Title = styled.h3``;

const Arrow = styled.span`
  margin-right: 20px;
`;

interface IPropType {
  name: string;
  image: string;
}

function CoinList({ name, image }: IPropType) {
  return (
    <Wrapper>
      <Col>
        <Icon src={image} />
        <Title>{name}</Title>
      </Col>
      <Col>
        <Arrow>▶︎</Arrow>
      </Col>
    </Wrapper>
  );
}

export default CoinList;
