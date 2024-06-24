import styled from 'styled-components';
import Header from '@/components/header/Header';
import LoginHeader from '@/components/header/LoginHeader';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const SearchPage = () => {
    const [posts, setPosts] = useState([]);
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('q')

    useEffect(() => {
        getSearchList();
    }, []);

    const getSearchList = async () => {
        try {
            const res = await axios.get(`http://localhost:8081/review/search`, {
                params: {
                    keyword: searchQuery,
                }
            });
            setPosts(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <MainContainer>
            {localStorage.getItem('Key') ? <LoginHeader /> : <Header />}
            <MainText>
                <h2>{searchQuery ? `${searchQuery}에 대한 검색 결과` : '검색 결과'}</h2>
            </MainText>
            {posts.map((post) => (
                <Link key={post.id} to={`/page/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Post post={post} />
                </Link>
            ))}
        </MainContainer>
    );
};

export default SearchPage;

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

const MainContainer = styled.div`
    width: 100%;
    overflow-x: hidden;
    white-space: nowrap;
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

const MainText = styled.div`
    text-align: left;
    margin: 30px;
    margin-left: 205px;
`;
