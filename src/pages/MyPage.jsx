import AuthHeader from '@/components/header/AuthHeader';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyPage = () => {
    const token = localStorage.getItem("Key");
    console.log(token);

    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [interests, setInterests] = useState([]);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [percent, setPercent] = useState([]);
    const [image, setImage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const DefaultInterests = ["SEA", "MOUNTAIN", "WORKING_ROAD", "RESTAURANT", "VIEW", "FESTIVAL", "NATURE", "FOOD", "SHOPPING", "CULTURE"];

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            const res = await axios.get(`http://localhost:8081/users/profile`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            setNickname(res.data.nickname);
            setEmail(res.data.email);
            setInterests(res.data.interests);
            setPercent(res.data.percent);
            setImage(res.data.image);
        } catch (error) {
            throw error;
        }
    };

    const addInterest = (item) => {
        if (!selectedInterests.includes(item)) {
            setSelectedInterests([...selectedInterests, item]);
        } else {
            setSelectedInterests(selectedInterests.filter(interest => interest !== item));
        }
    };

    const saveInterests = async () => {
        try {
            await axios.patch(`http://localhost:8081/users/interest`, { interests: selectedInterests }, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            setInterests(selectedInterests);
            setShowModal(false);
        } catch (error) {
            throw error;
        }
    };

    const interestsString = interests.join(', ');

    return (
        <div>
            <AuthHeader />
            <MyPageContainer>
                <ProfileBox>
                    <ProfileImage src={image} alt="ProfileImage" />
                </ProfileBox>
                <UserInfoBox>
                    <UserInfoItem>{nickname}</UserInfoItem>
                    <UserInfoItem>{email}</UserInfoItem>
                    <UserInfoItem>관심사: {interestsString}</UserInfoItem>
                </UserInfoBox>
                <ActionsBox>
                    <ActionButton onClick={() => setShowModal(true)}>+</ActionButton>
                </ActionsBox>
                <ActionsBox>
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
                            {DefaultInterests.map((item) => (
                                <InterestButton
                                    key={item}
                                    onClick={() => addInterest(item)}
                                    selected={selectedInterests.includes(item)}
                                >
                                    {item}
                                </InterestButton>
                            ))}
                        </ModalContent>
                        <ModalFooter>
                            <CloseButton onClick={() => setShowModal(false)}>닫기</CloseButton>
                            <SaveButton onClick={saveInterests}>수정</SaveButton>
                        </ModalFooter>
                    </ModalBox>
                </ModalContainer>
            )}
            <CountryReviews>
                {percent.map((country, index) => (
                    <ReviewBar key={index}>
                        <CountryName>{country.country}</CountryName>
                        <ProgressBar percent={country.percent} />
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
    gap: 10px;
`;

const InterestButton = styled.button`
    margin-bottom: 10px;
    margin-right: 10px;
    background-color: ${(props) => (props.selected ? '#007bff' : '#eee')};
    color: ${(props) => (props.selected ? '#fff' : '#000')};
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
        background-color: ${(props) => (props.selected ? '#0056b3' : '#ccc')};
    }
`;

const CloseButton = styled.button`
    background-color: #eee;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
`;

const SaveButton = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
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
    position: relative;
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
