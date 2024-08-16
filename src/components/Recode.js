import React, { useState, useEffect, forwardRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import { IoHeart } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { MdCalendarMonth } from "react-icons/md";
import { BsFileEarmarkPlusFill } from "react-icons/bs"
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import DatePicker from 'react-datepicker';
import DaumPostcode from 'react-daum-postcode';
import 'react-datepicker/dist/react-datepicker.css';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const IconHeart = styled(IoHeart)`
  font-size: 30px;
  margin: 0 2px;
  color: ${(props) => (props.filled ? '#212121' : '#C3C3C3')};
  cursor: pointer;
`;
const IconClose = styled(IoIosClose)`
  color: #212121;
  font-size: 29px;
  vertical-align: middle;
`;
const IconCalendar = styled(MdCalendarMonth)`
  font-size: 23px;
  padding-left: 5px;
  vertical-align: middle;
`;
const IconRight = styled(FaChevronRight)`
  font-size: 13px;
  vertical-align: middle;
`;
const IconPicture = styled(BsFileEarmarkPlusFill)`
  color: #C3C3C3;
  font-size: 40px;
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
`;
const Container = styled.div`
  max-width: 450px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;
const Header = styled.div`
  animation: ${fadeIn} 0.5s ease-in-out;
  max-width: 450px;
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
  animation: ${fadeIn} 0.5s ease-in-out;
  padding-top: 52px;
`;
const ImgWrap = styled.div`
  width: 248px;
  height: 301px;
  overflow:hidden;
  margin: 17px auto;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit:cover;
  border-radius: 15px;
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
const Submit = styled.button`
  color: ${(props) => (props.disabled ? '#C3C3C3' : '#212121')};
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
`
const Footer = styled.div`
  font-size: 12px;
  color: #dedede;
  text-align: right;
  padding: 16px;
`
const FileLabel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: inherit;
  border: 1px solid #C3C3C3;
  cursor: pointer;
  text-align: center;
  border-radius: 15px;
`;
const FileText = styled.p`
  margin-bottom: 7px;
  color: #C3C3C3;
  font-family: sans-serif;
`;
const FileInput = styled.input`
  display: none;
`;
const DateButton = styled.button`
`
const Contents = styled.div`
  border-top: 1px solid #E6E6E6;
  border-bottom: 1px solid #E6E6E6;
`

export default function Recode() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    cafeName: '',
    text: '',
    location: '',
    taste: '',
    vibes: '',
    specialMenu: '',
    rating: 0,
    imageUrl: '',
    date: new Date().toISOString(),
  });

  const [imageFile, setImageFile] = useState(null);
  const storage = getStorage();
  const [showPostcode, setShowPostcode] = useState(false); // 주소검색
  const [isFormValid, setIsFormValid] = useState(false); // 양식 검사

  useEffect(() => {
    const { cafeName, text, location, taste, vibes, specialMenu, rating, imageUrl, date } = formData;
    const isValid = cafeName && text && location && taste && vibes && specialMenu && rating > 0 && imageUrl && date;
    setIsFormValid(isValid);
  }, [formData]);

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

  const handleDateChange = (date) => {
    setFormData({ ...formData, date: date.toISOString() });
  };

  const handleAddress = (data) => {
    setFormData({ ...formData, location: data.address });
    setShowPostcode(false);
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      let imageUrl = '';
      if (imageFile) {
        const storageRef = ref(storage, `images/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }
      const dateISO = new Date(formData.date).toISOString();
      await addDoc(collection(db, 'cafes'), {
        ...formData,
        imageUrl,
        date: dateISO,
      });
      alert('저장되었어요✔');
      navigate('/');
    } catch (e) {
      console.error('문서 추가 중 오류 발생: ', e);
    }
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
  };

  const CustomDatePicker = forwardRef(({ value, onClick }, ref) => {
    return (
    <DateButton onClick={onClick} ref={ref}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {value || '날짜를 선택하세요'}
        <IconCalendar/>
      </div>
    </DateButton>
    );
  });

  return (
    <Main>
      <GlobalStyle />
      <Container>
        <Header>
          <Link to='/'><IconClose/></Link>
          <DateArea>
            <DatePicker
              selected={new Date(formData.date)}
              onChange={handleDateChange}
              dateFormat="yyyy년 MM월 dd일"
              customInput={<CustomDatePicker />}
            />
          </DateArea>
          <Submit onClick={handleSubmit} disabled={!isFormValid}>완료</Submit>
        </Header>
        <WriteWrap>
          <ImgWrap onClick={() => document.getElementById('fileInput').click()}>
            {formData.imageUrl ? (
              <Img src={formData.imageUrl} alt="Preview" /> 
            ) : (
              <FileLabel>
                <FileText>사진 추가하기</FileText>
                <IconPicture />
              </FileLabel>
            )}
            <FileInput id="fileInput" type="file" onChange={handleImageChange} />
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
              <Input type="text" placeholder='직접 입력' name="location" onChange={handleChange} value={formData.location}/>
              <button onClick={() => setShowPostcode(true)}>주소검색<IconRight /></button>
            </ListItem>
            {showPostcode && (
              <Contents>
                <DaumPostcode
                  onComplete={handleAddress}
                />
              </Contents>
            )}
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
              <IconHeart
              key={index}
              filled={index < formData.rating ? 1 : 0}
              onClick={() => handleRatingChange(index + 1)}
            />
            ))}
          </RatingWrap>
        </WriteWrap>
        <Footer>@gayeongogo</Footer>
      </Container>
    </Main>
  )
}
