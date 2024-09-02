import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
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

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert('이메일 또는 비밀번호를 다시 확인하세요.');
    }
  };

  return (
    <Main>
      <FormBox>
        <Form>
        <Title>로그인</Title>
        <Subtitle>로그인하고 안전하게 이용하세요</Subtitle>
        <Container>
          <Input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Container>
        <SignUpBtn onClick={handleLogin}>로그인</SignUpBtn>
        </Form>
        <Section>
          <p>아직 계정이 없나요? <Link to="/signup">회원가입</Link> </p>
        </Section>
      </FormBox>
    </Main>
  );
}
