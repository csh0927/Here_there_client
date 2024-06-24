import styled from 'styled-components';
import logo from '@/assets/logo.svg';

export const LoginHeader = () => {

    const handleLogoClick = () => {
        window.location.href = '/';
    }

    return (
        <HeaderBox>
            <HeaderInner>
                <Logo alt="logo" src={logo} onClick={handleLogoClick} />
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

const Logo = styled.img`
    cursor: pointer;
`;