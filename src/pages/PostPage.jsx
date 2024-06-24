import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '@/components/header/Header';
import LoginHeader from '@/components/header/LoginHeader';

const PostPage = () => {
    const { id } = useParams(); 
    const token = localStorage.getItem("Key");
    const [post, setPost] = useState({});

    useEffect(() => {
        getPostDetail();
    }, [id]);

    const getPostDetail = async () => {
        try {
            const res = await axios.get(`http://localhost:8081/review/${id}`);
            setPost(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleAddressClick = () => {
        window.open(
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(post.address)}`,
            '_blank'
        );
    };

    return (
        <div>
            {token ? <LoginHeader /> : <Header />}
            <PostContainer>
                <PostTitle>{post.title}</PostTitle>
                <PostImage src={post.image} alt="게시글 사진" />
                <PostContent>{post.content}</PostContent>
                <TouristSpotInfo>
                    <h2>관광지 정보</h2>
                    <br />
                    <p>{post.name}</p>
                    <p>국가: {post.country}</p>
                    <p>지역: {post.region}</p>
                    <AddressLink onClick={handleAddressClick}>{post.address}</AddressLink>
                    <p>관심사: {post.interests?.join(', ')}</p>
                </TouristSpotInfo>
            </PostContainer>
        </div>
    );
};

export default PostPage;

const PostContainer = styled.div`
    padding: 20px;
    text-align: center;
    width: 60%;
    margin: 0 auto;
    position: relative;
`;

const PostTitle = styled.h1`
    font-size: 24px;
    font-weight: bold;
    margin-top: 28px;
    margin-bottom: 40px;
    text-align: left;
`;

const PostImage = styled.img`
    width: 100%;
    max-height: 500px;
    object-fit: cover;
    margin: 0 auto 20px;
`;

const PostContent = styled.p`
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 20px;
    text-align: center;
`;

const TouristSpotInfo = styled.div`
    text-align: left;
    margin-bottom: 20px;
    margin-top: 60px;
`;

const AddressLink = styled.a`
    color: black;
    text-decoration: none;
    cursor: pointer;
    display: block;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: color 0.3s;

    &:hover {
        color: #007bff;
    }
`;
