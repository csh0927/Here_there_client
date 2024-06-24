import AuthHeader from '@/components/header/AuthHeader';
import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const navigation = useNavigate();

    const loginOnClick = async () => {
        try {
            const response = await axios.post(`http://localhost:8081/users/login`, {
                email: email,
                password: pw,
            });
            localStorage.setItem("Key", response.data.accessToken)
            navigation('/')
        } catch (error) {
            throw error;
        }
    };

    return (
        <div>
            <AuthHeader />
            <LoginBox>
                <LoginInner>
                    <h1>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        로그인
                    </h1>
                    <LoginForm>
                        <InputField
                            type="email"
                            placeholder="이메일"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <InputField
                            type="password"
                            placeholder="비밀번호"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                        />
                        <LoginButton onClick={loginOnClick}>로그인</LoginButton>
                    </LoginForm>
                </LoginInner>
            </LoginBox>
        </div>
    );
};

export default LoginPage;

const LoginBox = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
`;

const LoginInner = styled.div`
    text-align: center;
`;

const LoginForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
`;

const InputField = styled.input`
    width: 303px;
    height: 30px;
    border-radius: 5px;
    padding: 5px;
    border: 1px solid #ccc;
`;

const LoginButton = styled.button`
    background-color: #f5ddd6;
    color: black;
    max-width: 303px;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
`;
