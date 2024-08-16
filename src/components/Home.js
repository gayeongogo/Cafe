import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import { IoHeart } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { db } from '../firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import Modal from './Modal';

// 요소가 천천히 나타나는 애니메이션 정의
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const IconHeart = styled(IoHeart)`
  color: ${(props) => (props.filled ? 'white' : 'rgba(255,255,255,0.3)')};
  font-size: 22px;
  margin: 0 1px;
`;
const IconPlus = styled(GoPlus)`
  color: white;
  font-size: 27px;
  vertical-align: middle;
`;

const Main = styled.div`
  margin: 0 auto;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f0f0f0;
  color: #212121;
`;
const Container = styled.div`
  position: relative;
  max-width: 450px;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  background-image: url('/images/monun-bg.jpg');
  background-attachment: fixed;
  background-size: contain;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;
const Header = styled.div`
  max-width: 450px;
  width: 100%;
  height: ${(props) => (props.shrunk ? "30px" : "52px")};
  background-image: ${(props) => (props.shrunk ? "none" : "url('/images/title-color.png')")};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center 7px;
  background-color: ${(props) => (props.shrunk ? "rgba(255,255,255,0.7)" : "none")};
  backdrop-filter: ${(props) => (props.shrunk ? "blur(10px)" : "none")};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  position: fixed;
  z-index: 1000;
  transition: height 0.5s ease;
`;
const Title = styled.p`
  font-size: ${(props) => (props.shrunk ? "1.2rem" : "2rem")};
  font-weight: 600;
  color: #323031;
  transition: height 0.5s ease;
`;
const CardWrap = styled.div`
  animation: ${fadeIn} 1s ease-out;
  padding: 70px 20px 30px 20px;
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
  font-size: 2rem;
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
  white-space: pre-wrap; 
  word-wrap: break-word;
  line-height: 120%;
  margin: 12px 7px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical;
`;
const Text = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;
const CardFooter = styled.div`
  padding: 0 7px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #EAEAEA;
`;
const DateArea = styled.p`
  font-size: 13px;
  color: #7A7A7A;
  font-weight: 500;
  padding-top: 3px;
`;
const CreateBtn = styled.button`
  width: 60px;
  height: 60px;
  text-align: center;
  position: fixed;
  bottom : 40px;
  left: 50%;
  transform: translate(-50%, 0);
  background: #657DD2;
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
  width: 450px;
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 12px;
  color: #dedede;
  text-align: right;
  padding: 16px;
`

export default function Home() {
  const [cafes, setCafes] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);

  const handleCardClick = (cafe) => {
    setSelectedCafe(cafe);
  };

  const handleCloseModal = () => {
    setSelectedCafe(null);
  };

  useEffect(() => {
    const fetchCafes = async () => {
      const cafesCollection = collection(db, 'cafes');
      const cafesSnapshot = await getDocs(cafesCollection);
      let cafesList = cafesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      cafesList = cafesList.sort((a, b) => new Date(b.date) - new Date(a.date)); // 날짜 기준 내림차순
      setCafes(cafesList);
    };

    fetchCafes();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation(); // 이벤트 전파 방지(모달 열림 막기)
    const confirmed = window.confirm("정말 삭제하시나요?");
    if (confirmed) {
      try {
        await deleteDoc(doc(db, 'cafes', id));
        setCafes(prevCafes => prevCafes.filter(cafe => cafe.id !== id));
        alert('삭제되었어요✔');
        setSelectedCafe(null);
      } catch (e) {
        console.error('삭제 중 오류 발생: ', e);
      }
    }
  };

  const [isShrunk, setIsShrunk] = useState(false); // 헤더 조정
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 52) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Main>
      <GlobalStyle />
      <Container>
        <Header shrunk={isShrunk}>
          <Title shrunk={isShrunk}>컵일기.</Title>
        </Header>
        {cafes.length > 0 ? (
          <CardWrap>
          {cafes.map((cafe, index) => (
            <Card onClick={() => handleCardClick(cafe)} key={index}>
              <CardMain>
                {cafe.imageUrl && <Img src={cafe.imageUrl} alt="Cafe" />}
                <ImgText>
                  <Name>{cafe.cafeName}</Name>
                  <Rating>
                    {[...Array(5)].map((_, i) => (
                      <IconHeart key={i} filled={i < cafe.rating ? 1 : 0} />
                    ))}
                  </Rating>
                </ImgText>
              </CardMain>
              <CardText>{cafe.text}</CardText>
              <CardFooter>
                <DateArea>{new Date(cafe.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</DateArea>
              </CardFooter>
            </Card>
          ))}
          </CardWrap>
        ) : (
          <Text>아직 기록이 없어요. <br/>다녀온 카페를 추가해 볼까요?</Text>
        )}
        <Link to='/recode'><CreateBtn><IconPlus/></CreateBtn></Link>
        <Footer>@gayeongogo</Footer>
      </Container>
      {selectedCafe && <Modal cafe={selectedCafe} onClose={handleCloseModal} onDelete={handleDelete} />} 
    </Main>
  )
}
