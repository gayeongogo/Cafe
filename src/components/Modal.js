import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { IoHeart } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";
import { RxDotsHorizontal } from "react-icons/rx";

const modalIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8); // 작게 시작
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1); // 원래 크기로
  }
`;


const ModalIconHeart = styled(IoHeart)`
  font-size: 17px;
  color: ${(props) => (props.filled ? '#212121' : '#C3C3C3')};
`;
const IconMap = styled(MdLocationOn)`
  font-size: 17px;
  vertical-align: middle;
  margin-bottom: 3px;
`;
const IconMore = styled(RxDotsHorizontal)`
  color: #7A7A7A;
  font-size: 24px;
  margin: 0 4px;
  vertical-align: middle;
`;
const Button = styled.button`
  text-align: center;
  text-decoration: none;
  color: inherit;
  width: 100%;
  padding: 7px 0;
  &:first-child{
    border-bottom: 1px solid #E6E6E6;
  }
  &:last-child{
    color: #B20808;
  }
`;

const Overlay = styled.div`
  position: fixed;
  max-width: 450px;
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
const Contents = styled.div`
  animation: ${modalIn} 0.2s ease-out;
  max-width: 400px;
  width: 90%;
  max-height: 90%;
  height: auto;
  position: fixed; 
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(1);
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
const ModalBg = styled.div`
  position: fixed;
  max-width: 450px;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2002;
  background-color: rgba(0,0,0,0.5);
`
const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute; 
  width: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
  z-index: 2003;
`
const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  position: sticky;
  top: 0;
  padding: 7px 0;
  z-index: 2004;
`
const ModalDate = styled.div`
  margin: 0 auto;
`
const MoreBtn = styled.button`
  position: absolute;
  right: 5px;
`;
const ModalImg = styled.img`
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
`
const ModalMain = styled.div`
  padding: 0 16px 20px 16px;
`
const ModalTitle = styled.div`
  font-size: 1.5rem;
  margin-top: 7px;
`
const ModalLocation = styled.div`
  font-size: 14.5px;
  color: #707070;
`
const ModalRating = styled.div`
  margin-bottom: 7px;
`
const ModalText = styled.div`
  line-height: 120%;
  white-space: pre-wrap; 
  word-wrap: break-word;
  padding-bottom: 20px;
  font-size: 17px;
`

const Modal = ({ cafe, onClose, onDelete }) => {
  const [modalOpen, setModalOpen] = useState(false)
  
  if (!cafe) return null;

  return (
    <div>
      <Overlay onClick={onClose}>
        <Contents onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <ModalDate>{new Date(cafe.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</ModalDate>
            <MoreBtn onClick={() => setModalOpen(true)}><IconMore/></MoreBtn>
          </ModalHeader>
          {cafe.imageUrl && <ModalImg src={cafe.imageUrl} alt="Cafe image" />}
          <ModalMain>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <ModalTitle>{cafe.cafeName}</ModalTitle>
              <ModalLocation><IconMap/>{cafe.location}</ModalLocation>
            </div>
            <ModalRating>
              {[...Array(5)].map((_, i) => (
                <ModalIconHeart key={i} filled={i < cafe.rating ? 1 : 0} />
              ))}
            </ModalRating>
            <ModalText>{cafe.text}</ModalText>
            <p>맛 - {cafe.taste}</p>
            <p>분위기 - {cafe.vibes}</p>
            <p>특별한 메뉴 - {cafe.specialMenu}</p>
          </ModalMain>
        </Contents>
      </Overlay>
      {modalOpen && 
        <ModalBg onClick={() => setModalOpen(false)}>
          <ModalContents>
            <Button as={Link} to={`/edit/${cafe.id}`}>수정하기</Button>
            <Button onClick={(e) => onDelete(cafe.id, e)}>삭제하기</Button>
          </ModalContents>
        </ModalBg>
      }
    </div> 
  )
}

export default Modal;
