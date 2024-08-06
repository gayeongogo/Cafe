import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyle from './GlobalStyle';
import { IoHeart } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { HiPencil } from "react-icons/hi2";
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const IconHeart = styled(IoHeart)`
  color: black;
  font-size: 30px;
  margin: 0 2px;
`;
const IconClose = styled(IoIosClose)`
  color: black;
  font-size: 29px;
  vertical-align: middle;
`;
const IconPencil = styled(HiPencil)`
  color: black;
  font-size: 24px;
  padding-left: 5px;
  vertical-align: middle;
`;
const IconRight = styled(FaChevronRight)`
  color: black;
  font-size: 13px;
  vertical-align: middle;
`;
const Main = styled.div`
  font-family: Arial, sans-serif;
  margin: 0 auto;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #f0f0f0;
`;
const Container = styled.div`
  max-width: 500px;
  width: 100%;
  height: 100%;
  background-color: #fff;
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
  background-color: rgba(255,255,255,0.7);
`;
const DateArea = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 24px;
`;
const WriteWrap = styled.div`
  padding-top: 52px;
`;
const ImgWrap = styled.div`
  width: 248px;
  height: 301px;
  overflow:hidden;
  margin: 17px auto;
  border-radius: 15px;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit:cover;
`;
const TextArea = styled.textarea`
  width: 100%;
  height: 5.5em;
  border: none;
	resize: none;
  margin: 10px 0;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
  background: #666;
  border-radius: 20px;
  }
  &:focus{
    outline: none; 
  }
`
const List = styled.ul`
  display: flex;
  flex-direction: column;
`
const ListItem = styled.li`
  display : flex;
  flex-direction: row;
  align-items: center;
  border-top: 1px solid #E6E6E6;
  padding: 13px 16px;
  &:last-child {
    border-bottom: 1px solid #E6E6E6;
  }
`
const Label = styled.label`
  width: 120px;
  display: inline-block;
`
const Input = styled.input`
  flex-grow: 1;
`
const RatingWrap = styled.div`
  text-align: center;
  padding: 30px 0;
`
const Footer = styled.div`
  font-size: 12px;
  color: #dedede;
  text-align: right;
  padding: 16px;
`


export default function Recode() {
  const [formData, setFormData] = useState({
    cafeName: '',
    text: '',
    location: '',
    taste: '',
    vibes: '',
    specialMenu: '',
    rating: 0,
    imageUrl: '',
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [imageFile, setImageFile] = useState(null);
  const storage = getStorage();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = '';
      if (imageFile) {
        const storageRef = ref(storage, `images/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }
      await addDoc(collection(db, 'cafes'), {
        ...formData,
        imageUrl,
        date: new Date().toISOString(),
      });
      alert('데이터가 성공적으로 저장되었습니다!');
    } catch (e) {
      console.error('문서 추가 중 오류 발생: ', e);
    }
  };
  return (
    <Main>
      <GlobalStyle />
      <Container>
        <Header>
          <Link to='/'><IconClose/></Link>
          <DateArea>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy년 MM월 dd일"
            />
            <button><IconPencil/></button>
          </DateArea>
          <button onClick={handleSubmit}>완료</button>
        </Header>
        <WriteWrap>
          <ImgWrap>
          <input type="file" onChange={handleImageChange} />
          {formData.imageUrl && <Img src={formData.imageUrl} alt="Preview" />}
          </ImgWrap>
          <div style={{padding: '16px'}}>
            <TextArea type="text" placeholder='글을 입력하세요.'  name="text" onChange={handleChange}/>
          </div>
          <List>
            <ListItem>
              <Label htmlFor="name">카페 이름</Label>
              <Input type="text" placeholder='카페 이름을 입력하세요.' name="cafeName" onChange={handleChange}/>
            </ListItem>
            <ListItem>
              <Label htmlFor="location">위치 추가</Label>
              <Input type="text" placeholder='위치 찾기...' name="location" onChange={handleChange}/>
              <IconRight/>
            </ListItem>
            <ListItem>
              <Label htmlFor="taste">맛</Label>
              <Input type="text" placeholder='커피와 디저트의 맛은 어땠나요?' name="taste" onChange={handleChange}/>
            </ListItem>
            <ListItem>
              <Label htmlFor="vibes">분위기</Label>
              <Input type="text" placeholder='어떤 감성의 카페였나요?' name="vibes" onChange={handleChange}/>
            </ListItem>
            <ListItem>
              <Label htmlFor="specialMenu">특별한 메뉴</Label>
              <Input type="text" placeholder='이 곳의 시그니처 메뉴는요...' name="specialMenu" onChange={handleChange}/>
            </ListItem>
          </List>
          <RatingWrap>
            <p style={{fontSize: '17px', marginBottom: '10px'}}>평점</p>
            {[...Array(5)].map((_, index) => (
              <IconHeart key={index} onClick={() => setFormData({ ...formData, rating: index + 1 })} />
            ))}
          </RatingWrap>
        </WriteWrap>
        <Footer>@gayeongogo</Footer>
      </Container>
    </Main>
  )
}
