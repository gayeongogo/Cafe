import React from 'react'
import styled from 'styled-components';
import { IoHeart } from "react-icons/io5";
import { MdLocationOn } from "react-icons/md";


const ModalIconHeart = styled(IoHeart)`
  color: #000000;
  font-size: 17px;
`;

const IconMap = styled(MdLocationOn)`
  color: #000000;
  font-size: 19px;
  vertical-align: middle;
  margin-right: 4px;
  margin-bottom: 3px;
`;

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
  padding: 0 16px 20px 16px;
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

const Modal = ({ cafe, onClose }) => {
  if (!cafe) return null;
  return (
    <div>
      <ModalBg onClick={onClose}>
        <ModalContents onClick={e => e.stopPropagation()}>
          <ModalDate>{new Date(cafe.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}</ModalDate>
          {cafe.imageUrl && <ModalImg src={cafe.imageUrl} alt="Cafe image" />}
          <ModalMain>
            <ModalTitle><IconMap/>{cafe.cafeName}</ModalTitle>
            <ModalLocation>{cafe.location}</ModalLocation>
            <ModalRating>
              {[...Array(cafe.rating)].map((_, i) => (
                <ModalIconHeart key={i} />
              ))}
            </ModalRating>
            <ModalText>{cafe.text}</ModalText>
            <p>맛: {cafe.taste}</p>
            <p>분위기: {cafe.vibes}</p>
            <p>특별한 메뉴: {cafe.specialMenu}</p>
          </ModalMain>
        </ModalContents>
      </ModalBg>
    </div> 
  )
}

export default Modal;
