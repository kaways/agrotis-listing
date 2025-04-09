import styled from 'styled-components';
import Logo from '@/assets/logo.png';

const Wrapper = styled.h1`
    background: #FFFFFF;
    padding: 20px;
    border-bottom: 2px solid #f0f0f0;
    box-shadow: 0 4px 2px -2px gray;
`;

export const Header = () => {
    return (
        <Wrapper className="flex justify-center items-center">
            <img src={Logo} />
        </Wrapper>
    );
};

export default Header;