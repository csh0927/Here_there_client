import { useState } from 'react';
import styled from 'styled-components';
import image from '@/assets/franch.svg';
import Header from '@/components/header/Header';

const MainPage = () => {
    const trainCompartment = [image, image, image];

    const posts = [
        {
            id: 1,
            image: '게시글 이미지 URL',
            author: '작성자',
            date: '작성일',
            title: '게시글 제목',
            description: '게시글 설명',
        },
        {
            id: 2,
            image: '게시글 이미지 URL',
            author: '작성자',
            date: '작성일',
            title: '게시글 제목',
            description: '게시글 설명',
        },
        {
            id: 3,
            image: '게시글 이미지 URL',
            author: '작성자',
            date: '작성일',
            title: '게시글 제목',
            description: '게시글 설명',
        },
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrevSlide = () => {
        const newIndex = (currentIndex - 1 + trainCompartment.length) % trainCompartment.length;
        setCurrentIndex(newIndex);
    };

    const handleNextSlide = () => {
        const newIndex = (currentIndex + 1) % trainCompartment.length;
        setCurrentIndex(newIndex);
    };

    return (
        <MainContainer>
                <Header />
            <MainShow currentIndex={currentIndex}>
                {trainCompartment.map((item, index) => (
                    <MainCompartment
                        key={index}
                        index={index}
                        style={{ backgroundImage: `url(${item})` }}
                    ></MainCompartment>
                ))}
            </MainShow>
            <ButtonWrapper>
                <button onClick={handlePrevSlide}>이전</button>
                <button onClick={handleNextSlide}>다음</button>
            </ButtonWrapper>
            <MainText>
                <h2>
                    여기저기에서 각 나라의 관광지를 빠르게 찾고 여행을 준비해보세요!
                    <br />
                    <br />
                    쉽고 빠른 관광지 탐색, 여기저기
                    <br />
                    <br />
                    <br />
                </h2>
            </MainText>
            {posts.map((post, index) => (
                <Post key={post.id} index={index} post={post} />
            ))}
        </MainContainer>
    );
};

const Post = ({ post }) => {
    return (
        <PostContainer>
            <PostImage style={{ backgroundImage: `url(${image})` }} />
            <PostText>
                <br />
                <br />
                <p>{post.author}</p>
                <p>{post.date}</p>
                <br />
                <br />
                <br />
                <br />
                <br />
                <h3>{post.title}</h3>
                <p>{post.description}</p>
            </PostText>
        </PostContainer>
    );
};

export default MainPage;

const MainShow = styled.div`
    display: flex;
    width: 100%;
    transition: transform 1s ease;
    transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
`;

const MainCompartment = styled.div`
    flex-shrink: 0;
    width: 100vw;
    height: 600px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
`;

const ButtonWrapper = styled.div`
    position: absolute;
    bottom: 200px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 25px;
    outline: none;
`;

const MainContainer = styled.div`
    width: 100%;
    overflow-x: hidden;
    white-space: nowrap;
`;

const MainText = styled.div`
    margin-top: 40px;
    text-align: center;
`;

const PostContainer = styled.div`
    display: flex;
    width: 1100px;
    height: 300px;
    margin: 0 auto;
    background-color: #f5f5f5;
    gap: 10px;
    margin-bottom: 40px;
`;

const PostImage = styled.div`
    width: 400px;
    height: 300px;
    background-size: cover;
    margin-right: 20px;
`;

const PostText = styled.div`
    flex-direction: column;
    padding: 20px;
`;
