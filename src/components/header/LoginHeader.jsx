import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '@/assets/logo.svg';
import { ReactComponent as SearchIcon } from '@/assets/search.svg';
import React, { useState } from 'react';

export const LoginHeader = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${searchQuery}`);
        }
    };

    const handleLogoClick = () => {
        navigate('/')
    }

    const handleLogout = () => {
        localStorage.clear();
        navigate('/')
    }

    return (
        <HeaderBox>
            <HeaderInner>
                <Logo alt="logo" src={logo} onClick={handleLogoClick} />
                <form onSubmit={handleSearchSubmit}>
                    <SearchInput
                        type="text"
                        placeholder="검색.."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                    />
                    <SearchButton type="submit">
                        <SearchIcon />
                    </SearchButton>
                </form>
                <HeaderMenu>
                    <Link to={'/review'}>후기 작성</Link>
                    <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                    <Link to={'/mypage'}>마이페이지</Link>
                </HeaderMenu>
            </HeaderInner>
        </HeaderBox>
    );
};

export default LoginHeader;

const HeaderBox = styled.div`
    background-color: #f7f0e8;
    width: 100vw;
    height: 65px;
`;

const HeaderInner = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    padding: 0 20px;
`;

const HeaderMenu = styled.div`
    display: flex;
    gap: 30px;
    padding: 0 40px;
`;

const SearchInput = styled.input`
    width: 250px;
    height: 30px;
    border-radius: 15px;
    padding: 0 15px;
    border: none;
    outline: none;
`;

const SearchButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;

    svg {
        width: 20px;
        height: 20px;
    }

    position: relative;
    left: 10px;
    top: 5px;
`;

const Logo = styled.img`
    cursor: pointer;
`;

const LogoutButton = styled.button`
    background: none;
    border: none;
    color: #000;
    cursor: pointer;
    font-size: 16px;
    background-color: transparent;
`;