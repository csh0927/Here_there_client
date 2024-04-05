import styled from 'styled-components';
import image from '@/assets/franch.svg';
import Header from '@/components/header/Header';
import { Link } from 'react-router-dom';

const SearchPage = ({searchQuery}) => {
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

    return (
        <MainContainer>
            <Header />
            <MainText>
                <h2>{searchQuery ? `${searchQuery}에 대한 검색 결과` : "검색 결과"}</h2>
            </MainText>
            <Link to={`/page`} style={{ textDecoration: 'none', color: 'inherit' }}>
                {posts.map((post, index) => (
                    <Post key={post.id} index={index} post={post} />
                ))}
            </Link>
        </MainContainer>
    );
};

export default SearchPage;

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
