import React, { useState } from 'react';
import styled from 'styled-components';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import image from '@/assets/franch.svg';
import Header from '@/components/header/Header';

const PostPage = () => {
    const [interests] = useState(['바다', '산책로', '뷰', '맛집']);
    const [liked, setLiked] = useState(false);

    const comments = [
        { author: '작성자1', text: '댓글 내용입니다. Lorem ipsum dolor sit amet.' },
        { author: '작성자2', text: '댓글 내용입니다. Lorem ipsum dolor sit amet.' },
        { author: '작성자3', text: '댓글 내용입니다. Lorem ipsum dolor sit amet.' },
    ];

    const touristSpot = {
        name: '프랑스 파리',
        address: 'Champ de Mars, 5 Av. Anatole France, 75007 Paris, 프랑스',
    };

    const handleAddressClick = () => {
        window.open(
            `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(touristSpot.address)}`,
            '_blank'
        );
    };

    const handleLikeClick = () => {
        setLiked(!liked);
    };

    return (
        <div>
            <Header />
            <PostContainer>
                <PostTitle>게시글 제목</PostTitle>

                <PostImage src={image} alt="게시글 사진" />

                <LikeButton onClick={handleLikeClick}>{liked ? <FilledHeartIcon /> : <OutlineHeartIcon />}</LikeButton>

                <PostContent>
                    게시글 내용이 여기에 표시됩니다. 게시글 내용이 여기에 표시됩니다. 게시글 내용이 여기에 표시됩니다.
                    게시글 내용이 여기에 표시됩니다. 게시글 내용이 여기에 표시됩니다. 게시글 내용이 여기에 표시됩니다.
                    게시글 내용이 여기에 표시됩니다. 게시글 내용이 여기에 표시됩니다. 게시글 내용이 여기에 표시됩니다.
                    게시글 내용이 여기에 표시됩니다. 게시글 내용이 여기에 표시됩니다. 게시글 내용이 여기에 표시됩니다.
                    게시글 내용이 여기에 표시됩니다.게시글 내용이 여기에 표시됩니다. 게시글 내용이 여기에 표시됩니다.
                    게시글 내용이 여기에 표시됩니다.
                </PostContent>

                <TouristSpotInfo>
                    <h2>관광지 정보</h2>
                    <br />
                    <p>{touristSpot.name}</p>
                    <AddressLink onClick={handleAddressClick}>{touristSpot.address}</AddressLink>
                    <p>관심사: {interests.join(', ')}</p>
                </TouristSpotInfo>

                <CommentInputContainer>
                    <CommentInput type="text" placeholder="댓글 작성" />
                    <CommentButton>작성</CommentButton>
                </CommentInputContainer>

                <Comments>
                    {comments.map((comment, index) => (
                        <Comment key={index}>
                            <CommentText>
                                <strong>{comment.author}</strong>
                                <br />
                                {comment.text}
                                <br />
                                <br />
                            </CommentText>
                        </Comment>
                    ))}
                </Comments>
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

const CommentInputContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 0 auto 20px;
    max-width: 400px;
`;

const CommentInput = styled.input`
    flex: 1;
    height: 40px;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px 0 0 5px;
`;

const CommentButton = styled.button`
    height: 40px;
    padding: 0 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
`;

const Comments = styled.div`
    border-top: 1px solid #ccc;
    padding-top: 20px;
`;

const Comment = styled.div`
    margin-bottom: 10px;
`;

const CommentText = styled.p`
    margin: 0;
    text-align: left;
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

const LikeButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    top: 50px;
    right: 20px;
`;

const OutlineHeartIcon = styled(FaRegHeart)`
    font-size: 24px;
    color: red;
`;

const FilledHeartIcon = styled(FaHeart)`
    font-size: 24px;
    color: red;
`;
