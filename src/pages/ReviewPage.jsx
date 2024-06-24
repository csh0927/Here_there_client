import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Header from '@/components/header/Header';
import LoginHeader from '@/components/header/LoginHeader';
import { useNavigate } from 'react-router-dom';

const DefaultInterests = ["SEA", "MOUNTAIN", "WORKING_ROAD", "RESTAURANT", "VIEW", "FESTIVAL", "NATURE", "FOOD", "SHOPPING", "CULTURE"];

const ReviewPage = () => {
    const token = localStorage.getItem("Key");
    const [imageFile, setImageFile] = useState(null);
    const [imageURL, setImageURL] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        country: '',
        region: '',
        address: '',
        interests: '',
    });
    const [showModal, setShowModal] = useState(false);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const navigate = useNavigate();

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);

        const reader = new FileReader();
        reader.onload = (e) => {
            setImageURL(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePlusButtonClick = () => {
        document.getElementById('image-input').click();
    };

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const addInterest = (interest) => {
        setSelectedInterests((prevInterests) => 
            prevInterests.includes(interest)
            ? prevInterests.filter(item => item !== interest)
            : [...prevInterests, interest]
        );
    };

    const saveInterests = () => {
        setFormData((prevData) => ({
            ...prevData,
            interests: selectedInterests.join(', '),
        }));
        setShowModal(false);
    };

    const postReviewOnClick = async () => {
        const reviewData = new FormData();
        reviewData.append('file', imageFile);
        reviewData.append('data', new Blob([JSON.stringify({
            title: formData.title,
            content: formData.content,
            interests: selectedInterests,
            country: formData.country,
            region: formData.region,
            address: formData.address,
        })], { type: 'application/json' }));

        try {
            await axios.post(`http://localhost:8081/review`, reviewData, {
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            {localStorage.getItem("Key") ? <LoginHeader /> : <Header />}
            <ReviewContainer>
                <ReviewTitleInput
                    type="text"
                    placeholder="제목을 입력하세요"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
                <ImageContainer>
                    <ImageInput id="image-input" type="file" accept="image/*" onChange={handleImageChange} />
                    <PlusButton onClick={handlePlusButtonClick}>+</PlusButton>
                    {imageURL && <SelectedImage src={imageURL} alt="선택한 이미지" />}
                </ImageContainer>
                <ReviewContentTextarea
                    placeholder="내용을 입력하세요"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                />
                <TouristInfoBox>
                    <h2>관광지 정보</h2>
                    <TouristInfoInput
                        type="text"
                        placeholder="나라 입력"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                    />
                    <TouristInfoInput
                        type="text"
                        placeholder="지역 입력"
                        name="region"
                        value={formData.region}
                        onChange={handleInputChange}
                    />
                    <TouristInfoInput
                        type="text"
                        placeholder="주소 입력"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                    <InterestContainer>
                        <InterestLabel>관심사:</InterestLabel>
                        <SelectedInterests>{formData.interests}</SelectedInterests>
                        <AddInterestButton onClick={handleModalOpen}>추가</AddInterestButton>
                    </InterestContainer>
                </TouristInfoBox>
                <CompleteButton onClick={postReviewOnClick}>작성 완료</CompleteButton>
            </ReviewContainer>

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
                            <SaveButton onClick={saveInterests}>추가</SaveButton>
                        </ModalFooter>
                    </ModalBox>
                </ModalContainer>
            )}
        </div>
    );
};

export default ReviewPage;

const ReviewContainer = styled.div`
    padding: 20px;
    text-align: center;
    width: 60%;
    margin: 0 auto;
`;

const ReviewTitleInput = styled.input`
    width: 100%;
    height: 40px;
    padding: 0 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
`;

const ImageContainer = styled.div`
    position: relative;
    width: 100%;
    height: 400px;
    background-color: #f0f0f0;
    border-radius: 5px;
    margin-bottom: 20px;
`;

const ImageInput = styled.input`
    display: none;
`;

const PlusButton = styled.button`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #007bff;
    color: #fff;
    font-size: 24px;
    border: none;
    cursor: pointer;
`;

const SelectedImage = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: ${({ src }) => (src ? 'block' : 'none')};
    border-radius: 5px;
`;

const ReviewContentTextarea = styled.textarea`
    width: 100%;
    height: 200px;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
    font-size: 16px;
`;

const TouristInfoBox = styled.div`
    text-align: left;
    margin-bottom: 20px;
`;

const TouristInfoInput = styled.input`
    width: 100%;
    height: 40px;
    padding: 0 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
`;

const InterestContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
`;

const InterestLabel = styled.span`
    font-size: 16px;
    margin-right: 10px;
`;

const SelectedInterests = styled.span`
    flex: 1;
    padding: 5px 10px;
    background-color: #f8f8f8;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    line-height: 40px;
`;

const AddInterestButton = styled.button`
    margin-left: 10px;
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
`;

const CompleteButton = styled.button`
    width: 120px;
    height: 40px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

const ModalBox = styled.div`
    background: #fff;
    border-radius: 10px;
    width: 400px;
    max-width: 90%;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalHeader = styled.h3`
    margin-top: 0;
`;

const ModalContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
`;

const InterestButton = styled.button`
    background-color: ${({ selected }) => (selected ? '#007bff' : '#f0f0f0')};
    color: ${({ selected }) => (selected ? '#fff' : '#333')};
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: ${({ selected }) => (selected ? '#0056b3' : '#ddd')};
    }
`;

const ModalFooter = styled.div`
    display: flex;
    justify-content: space-between;
`;

const CloseButton = styled.button`
    padding: 5px 10px;
    background-color: #ccc;
    color: #333;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const SaveButton = styled.button`
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;
