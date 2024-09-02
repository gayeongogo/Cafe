import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Main = styled.div`
  margin: 0 auto;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  color: #212121;
`;

const FormBox = styled.div`
  max-width: 300px;
  background: #f1f7fe;
  overflow: hidden;
  border-radius: 16px;
  color: #010101;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  `
const Form = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px 24px 24px;
  gap: 16px;
  text-align: center;
`
const Title = styled.h2`
  font-weight: bold;
  font-size: 1.6rem;
`
const Subtitle = styled.p`
  font-size: 1rem;
  color: #666;
`
const Container = styled.div`
  overflow: hidden;
  border-radius: 8px;
  background-color: #fff;
  margin: 1rem 0 .5rem;
  width: 100%;
`
const Input = styled.input`
  background: none;
  border: 0;
  outline: 0;
  height: 40px;
  width: 100%;
  border-bottom: 1px solid #eee;
  font-size: .9rem;
  padding: 8px 15px;
`
const SignUpBtn = styled.button`
  background-color: #3452BC;
  color: #fff;
  border: 0;
  border-radius: 24px;
  padding: 10px 16px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color .3s ease;
  /* &:hover {
    background-color: #657DD2;
  } */
`
const Section = styled.div`
  padding: 16px;
  font-size: .85rem;
  background-color: #e0ecfb;
  box-shadow: rgb(0 0 0 / 8%) 0 -1px;
`

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('가입되었습니다. 로그인 해주세요');
      navigate('/login');
    } catch (error) {
      let errorMessage = '';
  
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage += '이메일 형식에 맞게 입력해 주세요.';
          break;
        case 'auth/weak-password':
          errorMessage += '비밀번호는 최소 6자 이상이어야 합니다.';
          break;
        case 'auth/email-already-in-use':
          errorMessage += '이미 사용 중인 이메일입니다. 다른 이메일을 사용하세요.';
          break;
        case 'auth/network-request-failed':
          errorMessage += '네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요.';
          break;
        default:
          errorMessage += error.message;
          break;
      }
      alert(errorMessage);
    }
  };

  return (
    <Main>
      <FormBox>
        <Form>
          <Title>회원가입</Title>
          <Subtitle>이메일로 계정을 만드세요</Subtitle>
          <Container>
            <Input
              type="email"
              placeholder="이메일 형태로 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="6자 이상의 비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Container>
          <SignUpBtn onClick={handleSignup}>가입하기</SignUpBtn>
        </Form>
        <Section>
          <p>이미 계정이 있나요? <Link to="/login">로그인</Link> </p>
        </Section>
      </FormBox>
    </Main>
  );
}
