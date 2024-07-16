import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import { IoHeart } from "react-icons/io5";
import { RxDotsHorizontal } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { MdLocationOn } from "react-icons/md";

const IconHeart = styled(IoHeart)`
  color: white;
  font-size: 22px;
  margin: 0 1px;
`;
const ModalIconHeart = styled(IoHeart)`
  color: #000000;
  font-size: 17px;
`;
const IconMore = styled(RxDotsHorizontal)`
  color: #7A7A7A;
  font-size: 24px;
  margin: 0 4px;
  vertical-align: middle;
`;
const IconPlus = styled(GoPlus)`
  color: white;
  font-size: 27px;
  vertical-align: middle;
`;
const IconMap = styled(MdLocationOn)`
  color: #000000;
  font-size: 19px;
  vertical-align: middle;
  margin-right: 4px;
  margin-bottom: 3px;
`;

const Main = styled.div`
  margin: 0 auto;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: white;
`;
const Container = styled.div`
  max-width: 500px;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: #EFEFEE;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;
const Header = styled.div`
  max-width: 500px;
  width: 100%;
  height: 52px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  position: fixed;
  z-index: 1000;
  //background-color: rgba(255,255,255,0.7);
`;
const Title = styled.p`
  font-size: 23px;
  font-weight: 600;
`;
const CardWrap = styled.div`
  padding: 70px 16px 0 16px;
`;
const Card = styled.div`
  padding: 12px;
  margin-bottom: 16px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
const CardMain = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 50%;
  overflow:hidden;
  border-radius: 15px;
`;
const Img = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit:cover;
`;
const ImgText = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  background: linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(113,113,113,0.3) 60%, rgba(255,255,255,0) 100%);
  color: white;
  position: absolute;
  top: 0;
  left: 0;
`;
const Name = styled.p`
  font-size: 19px;
  margin-bottom: 5px;
  position: absolute;
  bottom: 37px;
  left: 14px;
`;
const Rating = styled.div`
  position: absolute;
  bottom: 10px;
  left: 14px;

`;
const CardText = styled.div`
  margin: 12px 7px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical;
`;
const Text = styled.p`
  font-size: 15px;
`;
const CardFooter = styled.div`
  padding: 0 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #EAEAEA;
`;
const Date = styled.p`
  font-size: 13px;
  color: #7A7A7A;
  font-weight: 500;
`;
const MoreBtn = styled.button`
`;
const CreateBtn = styled.button`
  width: 60px;
  height: 60px;
  text-align: center;
  position: fixed;
  bottom : 40px;
  left: 50%;
  transform: translate(-50%, 0);
  background: #5D5C5B;
  border-radius: 50%;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease;
  &:hover{
    transform: translate(-50%, -5%);
    transition: all 0.2s ease;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.7);
  }
`;
const Footer = styled.div`
  font-size: 12px;
  color: #dedede;
  text-align: right;
  padding: 16px;
`
const Modal = styled.div`
`
const ModalBg = styled.div`
  position: fixed;
  max-width: 500px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  background-color: rgba(0,0,0,0.5);
  backdrop-filter: blur(2px);
`
const ModalContents = styled.div`
  max-width: 400px;
  width: 90%;
  height: 90%;
  position: absolute; 
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  z-index: 2001;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`
const ModalDate = styled.div`
  display: flex;
  justify-content: center;
  padding: 7px 0;
  font-size: 14px;
`
const ModalImg = styled.img`
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
`
const ModalMain = styled.div`
  padding: 0 16px;
`
const ModalTitle = styled.div`
  margin-top: 7px;

`
const ModalLocation = styled.div`
  font-size: 14.5px;
  color: #707070;
  margin-bottom: 5px;
`
const ModalRating = styled.div`
  margin-bottom: 7px;
`
const ModalText = styled.div`
  padding-bottom: 20px;
  font-size: 15px;
`

export default function Home() {

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Main>
      <GlobalStyle />
      <Container>
        <Header>
          <Title>컵일기</Title>
        </Header>
        <CardWrap>
          <Card onClick={() => setModalOpen(true)}>
            <CardMain>
              <Img src={`${process.env.PUBLIC_URL}/images/pudding.jpg`} alt="" />
              <ImgText>
                <Name>카페 이도</Name>
                <Rating><IconHeart/><IconHeart/><IconHeart/></Rating>
              </ImgText>
            </CardMain>
            <CardText>
              <Text>가끔은 귀엽기만 한 디저트도 먹고싶어<br/><br/>
                어떤 사람들은 고작 글씨로 채워져 있는 종이 뭉치에 푹 빠져서 인생의 소중한 시간을 소비하고, 어떤 사람들은 유치한 영화를 보면서 열광하고 심지어 장난감까지 수집합니다.<br/><br/>잔디밭에서 22명이 작은 공 하나를 차려고 발버둥 치는 행위에 수십억 명이 열광하고, 매일 저녁 TV 앞에 모여 앉아 눈물을 훔치기도 하죠.</Text>
            </CardText>
            <CardFooter>
              <Date>6월 20일 목요일</Date>
              <MoreBtn><IconMore/></MoreBtn>
            </CardFooter>
          </Card>
          
        </CardWrap>
        <Link to='/recode'><CreateBtn><IconPlus/></CreateBtn></Link>
        <Footer>@gayeongogo</Footer>
      </Container>
      {
   	      modalOpen && 
            <Modal>
              <ModalBg onClick={() => setModalOpen(false)}></ModalBg>
              <ModalContents>
                <ModalDate>6월 20일 목요일</ModalDate>
                <ModalImg src={`${process.env.PUBLIC_URL}/images/pudding.jpg`} alt="" />
                <ModalMain>
                  <ModalTitle><IconMap/>카페 이도</ModalTitle>
                  <ModalLocation>서울 서교동 112-25</ModalLocation>
                  <ModalRating><ModalIconHeart/><ModalIconHeart/><ModalIconHeart/><ModalIconHeart/></ModalRating>
                  <ModalText>가끔은 귀엽기만 한 디저트도 먹고싶어<br/><br/>
                    어떤 사람들은 고작 글씨로 채워져 있는 종이 뭉치에 푹 빠져서 인생의 소중한 시간을 소비하고, 어떤 사람들은 유치한 영화를 보면서 열광하고 심지어 장난감까지 수집합니다.<br/><br/>잔디밭에서 22명이 작은 공 하나를 차려고 발버둥 치는 행위에 수십억 명이 열광하고, 매일 저녁 TV 앞에 모여 앉아 눈물을 훔치기도 하죠.<br/><br/>퇴근 시간은 아직 멀었는데 벌써부터 시계를 보고, 나를 사랑하는지 확신조차 없는 사람을 위해 선물을 고민합니다. 이 중 이해할 수 있는 것은 단 하나도 없어요.<br/><br/>이 모든 이해할 수 없는 일들의 총합을 우리는 삶이라 부릅니다. 그러니 떳떳하게 원하는 곳에 애정을 쏟으세요. 그것이 삶을 합리적으로 만들어 주진 못해도 삶을 행복하게 만들어 줄 수는 있으니까요.</ModalText>
                </ModalMain>
              </ModalContents>
            </Modal> 
        }  
    </Main>
  )
}
