import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '@/assets/logo.svg';
import { ReactComponent as SearchIcon } from '@/assets/search.svg';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
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
                    <Link to={'/login'}>로그인</Link>
                    <Link to={'/signup'}>회원가입</Link>
                </HeaderMenu>
            </HeaderInner>
        </HeaderBox>
    );
};

export default Header;

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