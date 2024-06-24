import AuthHeader from '@/components/header/AuthHeader';
import styled from 'styled-components';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignupPage = () => {

    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [pw, setPw] = useState('');
    const [checkPw, setCheckPw] = useState('')
    const navigation = useNavigate();


    const signupOnclick = () => {
        if (!email || !nickname) {
            alert('빈 곳 없이 입력해주세요.');
            return;
        }

        if (pw != checkPw) {
            alert('비밀번호를 올바르게 재입력해주세요.')
            return;
        }

        axios
            .post(`http://localhost:8081/users`, {
                nickname: nickname,
                email: email,
                password: pw
            })
            .then(() => {
                navigation('/')
            })
            .catch((error) => {
                console.error('회원가입 요청 실패:', error);
                alert('회원가입 요청에 실패했습니다. 다시 시도해주세요.');
            });
    };

    return (
        <div>
            <AuthHeader />
            <SignupBox>
                <SignupInner>
                    <h1>회원가입</h1>
                    <SignupForm>
                        <InputField 
                            type="text" 
                            placeholder="닉네임" 
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)} 
                         />
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
                        <InputField
                            type="password"
                            placeholder="비밀번호 확인"
                            value={checkPw}
                            onChange={(e) => setCheckPw(e.target.value)}
                        />
                        <SignupButton onClick={signupOnclick}>회원가입</SignupButton>
                    </SignupForm>
                </SignupInner>
            </SignupBox>
        </div>
    );
};

export default SignupPage;

const SignupBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
`;

const SignupInner = styled.div`
    text-align: center;
`;

const SignupForm = styled.div`
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

const SignupButton = styled.button`
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
