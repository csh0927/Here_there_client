import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/header/Header';
import LoginHeader from '@/components/header/LoginHeader';

const MainPage = () => {
    const token = localStorage.getItem("Key");
    const [posts, setPosts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getSearchList();
    }, []);

    const getSearchList = async () => {
        try {
            const res = await axios.get(`http://localhost:8081/review/recommend`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            setPosts(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${searchQuery}`);
        }
    };

    const handlePrevSlide = () => {
        const newIndex = (currentIndex - 1 + topThreePosts.length) % topThreePosts.length;
        setCurrentIndex(newIndex);
    };

    const handleNextSlide = () => {
        const newIndex = (currentIndex + 1) % topThreePosts.length;
        setCurrentIndex(newIndex);
    };

    const topThreePosts = posts.slice(0, 3);

    return (
        <MainContainer>
            {localStorage.getItem('Key') ? <LoginHeader /> : <Header />}
            <ImageContainer>
                <MainShow currentIndex={currentIndex}>
                    {topThreePosts.map((post, index) => (
                        <Link key={post.id} to={`/page/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <MainCompartment
                                key={index}
                                index={index}
                                style={{ backgroundImage: `url(${post.image})` }}
                            ></MainCompartment>
                        </Link>
                    ))}
                </MainShow>
                <ButtonWrapper>
                    <NavButton onClick={handlePrevSlide}>이전</NavButton>
                    <NavButton onClick={handleNextSlide}>다음</NavButton>
                </ButtonWrapper>
            </ImageContainer>
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
            <PostList>
                {posts.slice(3).map((post) => (
                    <Link key={post.id} to={`/page/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Post post={post} />
                    </Link>
                ))}
            </PostList>
        </MainContainer>
    );
};

const Post = ({ post }) => {
    return (
        <PostContainer>
            <PostImage style={{ backgroundImage: `url(${post.image})` }} />
            <PostText>
                <p>{post.writerName}</p>
                <p>{new Date(post.createDate).toLocaleDateString()}</p>
                <br />
                <br />
                <h3>{post.title}</h3>
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
    height: 800px; /* 세로 길이를 늘렸습니다 */
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center; /* 이미지 가운데를 표시하도록 */
    background-repeat: no-repeat; /* 이미지 반복 금지 */
`;

const ButtonWrapper = styled.div`
    position: absolute;
    top: 90%; /* 이미지 높이의 90% 지점에 위치하도록 설정하여 하단으로 배치 */
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    gap: 20px;
    z-index: 10; /* 버튼이 다른 요소 위에 나타나도록 */
`;

const NavButton = styled.button`
    background-color: rgba(255, 255, 255, 0.8); /* 반투명한 배경 */
    border: 1px solid #ccc;
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`;

const MainContainer = styled.div`
    width: 100%;
    overflow-x: hidden;
    white-space: nowrap;
    position: relative; /* 메인 컨테이너도 상대 위치를 가집니다 */
`;

const ImageContainer = styled.div`
    position: relative; /* 이미지 컨테이너를 상대 위치로 설정하여 버튼이 이미지 위에 배치되도록 */
    width: 100%;
`;

const MainText = styled.div`
    margin-top: 20px; /* 이미지와 텍스트 사이의 간격 조정 */
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

const PostList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
