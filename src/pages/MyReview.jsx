import styled from 'styled-components';
import Header from '@/components/header/Header';
import LoginHeader from '@/components/header/LoginHeader';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const MyReview = () => {
    const [posts, setPosts] = useState([]);
    const token = localStorage.getItem("Key");

    useEffect(() => {
        getMyReview();
    }, []);

    const getMyReview = async () => {
        try {
            const res = await axios.get(`http://localhost:8081/review`, {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            setPosts(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <MainContainer>
            {localStorage.getItem("Key") ? <LoginHeader /> : <Header />}
            <MainText>
                <h2>내가 쓴 후기</h2>
            </MainText>
            {posts.map((post) => (
                <Link key={post.id} to={`/page/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Post post={post} />
                </Link>
            ))}
        </MainContainer>
    );
};

const Post = ({ post }) => {
    return (
        <PostContainer>
            <PostImage style={{ backgroundImage: `url(${post.image})` }} />
            {console.log(post.image)}
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

export default MyReview;

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
