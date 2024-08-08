import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import { IoHeart } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { db } from '../firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import Modal from './Modal';

const IconHeart = styled(IoHeart)`
  color: white;
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
    const confirmed = window.confirm("정말 삭제하시겠습니까?");
    if (confirmed) {
      try {
        await deleteDoc(doc(db, 'cafes', id));
        setCafes(prevCafes => prevCafes.filter(cafe => cafe.id !== id));
        alert('삭제가 완료되었습니다.');
        setSelectedCafe(null);
      } catch (e) {
        console.error('삭제 중 오류 발생: ', e);
      }
    }
  };

  return (
    <Main>
      <GlobalStyle />
      <Container>
        <Header>
          <Title>컵일기</Title>
        </Header>
        <CardWrap>
          {cafes.map((cafe, index) => (
            <Card onClick={() => handleCardClick(cafe)} key={index}>
              <CardMain>
                {cafe.imageUrl && <Img src={cafe.imageUrl} alt="Cafe" />}
                <ImgText>
                  <Name>{cafe.cafeName}</Name>
                  <Rating>
                    {[...Array(cafe.rating)].map((_, i) => (
                      <IconHeart key={i} />
                    ))}
                  </Rating>
                </ImgText>
              </CardMain>
              <CardText>
                <Text>{cafe.text}</Text>
              </CardText>
              <CardFooter>
                <DateArea>{new Date(cafe.date).toLocaleDateString()}</DateArea>
              </CardFooter>
            </Card>
          ))}
        </CardWrap>
        <Link to='/recode'><CreateBtn><IconPlus/></CreateBtn></Link>
        <Footer>@gayeongogo</Footer>
      </Container>
      {selectedCafe && <Modal cafe={selectedCafe} onClose={handleCloseModal} onDelete={handleDelete} />} 
    </Main>
  )
}
