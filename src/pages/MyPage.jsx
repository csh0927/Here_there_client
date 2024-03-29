import AuthHeader from '@/components/header/AuthHeader';
import styled from 'styled-components';
import profile from '@/assets/profile.svg';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const MyPage = () => {
    const [interests, setInterests] = useState(['바다', '산책로', '뷰', '맛집']);
    const [showModal, setShowModal] = useState(false);
    const [reviewsByCountry, setReviewsByCountry] = useState({
        대한민국: 60,
        파리: 30,
        미국: 20,
        일본: 10,
    });

    const newInterests = ['산', '평지', '도심', '도심 외'];

    const addInterest = (interest) => {
        setInterests([...interests, interest]);
        setShowModal(false);
    };

    return (
        <div>
            <AuthHeader />
            <MyPageContainer>
                <ProfileBox>
                    <ProfileImage src={profile} alt="Profile" />
                </ProfileBox>
                <UserInfoBox>
                    <UserInfoItem>사용자 닉네임</UserInfoItem>
                    <UserInfoItem>user@example.com</UserInfoItem>
                    <UserInfoItem>사용자 자기소개 내용</UserInfoItem>
                    <UserInfoItem>사용자 관심사: {interests.join(', ')}</UserInfoItem>
                </UserInfoBox>
                <ActionsBox>
                    <ActionButton onClick={() => setShowModal(true)}>+</ActionButton>
                </ActionsBox>
                <ActionsBox>
                    <ActionLink to="/liked-reviews">좋아요 한 후기</ActionLink>
                    <ActionLink to="/my-reviews">내가 쓴 후기</ActionLink>
                </ActionsBox>
            </MyPageContainer>
            <LineBox>
                <Line />
            </LineBox>
            {showModal && (
                <ModalContainer>
                    <ModalBox>
                        <ModalHeader>관심사 추가</ModalHeader>
                        <ModalContent>
                            {newInterests.map((item) => (
                            <InterestButton key={item} onClick={() => addInterest(item)}>
                                {item}
                            </InterestButton>
                            ))}
                        </ModalContent>
                        <ModalFooter>
                            <CloseButton onClick={() => setShowModal(false)}>닫기</CloseButton>
                        </ModalFooter>
                    </ModalBox>
                </ModalContainer>
            )}
            <CountryReviews>
                {Object.entries(reviewsByCountry).map(([country, percent]) => (
                    <ReviewBar key={country}>
                        <CountryName>{country}</CountryName>
                        <ProgressBar percent={percent} />
                    </ReviewBar>
                ))}
            </CountryReviews>
        </div>
    );
};

export default MyPage;

const MyPageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30h;
    margin-top: 70px;
`;

const LineBox = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10vh;
`;

const ProfileBox = styled.div`
    margin-bottom: 20px;
    margin-right: 40px;
`;

const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    border-radius: 50%;
`;

const UserInfoBox = styled.div`
    margin-bottom: 20px;
    text-align: center;
`;

const UserInfoItem = styled.div`
    margin-bottom: 10px;
    margin-right: 40px;
`;

const ActionsBox = styled.div`
    display: flex;
    margin-right: 40px;
    gap: 20px;
`;

const ActionLink = styled(Link)`
    text-decoration: none;
    color: #333;
    font-weight: bold;
    padding: 10px 20px;
    background-color: #eee;
    border-radius: 5px;

    &:hover {
        background-color: #ccc;
    }
`;

const ActionButton = styled.button`
    text-decoration: none;
    color: #333;
    font-weight: bold;
    padding: 10px 20px;
    background-color: #eee;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #ccc;
    }
`;

const ModalContainer = styled.div`
    position: fixed;
    bottom: 100px;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ModalBox = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
`;

const ModalHeader = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const ModalContent = styled.div`
    margin-bottom: 20px;
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const InterestButton = styled.button`
    margin-bottom: 10px;
    margin-right: 10px;
    background-color: #eee;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
`;

const CloseButton = styled.button`
    background-color: #eee;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
`;

const CountryReviews = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const ReviewBar = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    position: relative; /* 상대적 위치 지정 */
`;

const Line = styled.div`
    display: flex;
    justify-content: center;
    width: 60%;
    height: 1px;
    background-color: #848484;
`;

const CountryName = styled.div`
    width: 100px;
    font-weight: bold;
    margin-left: 50px;
`;

const ProgressBar = styled.div`
    position: relative;
    width: 200px;
    height: 10px;
    background-color: #ddd;
    border-radius: 5px;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        display: block;
        width: ${(props) => props.percent}%;
        height: 100%;
        background-color: #007bff;
        border-radius: 5px;
    }
`;
