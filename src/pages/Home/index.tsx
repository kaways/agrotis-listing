import Logo from '@/assets/logo_home.png';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Button = styled.h1`
    background: #00876E;
    padding: 10px;
    text-align: center;
    width: 250px;
    border-radius: 8px;
    color: #FFF;
    &: hover{
    cursor: pointer
    }
`;

export const Home = () => {
    const navigate = useNavigate();

    const handleAddAction = () => {
        navigate("/listagem");
    }

    return (
        <div className="flex flex-col h-dvh justify-center items-center gap-3">
            <h1 className='text-xl font-bold text-[#00876E] '>TESTE FRONT-END</h1>
            <p>Protótipo</p>
            <img src={Logo} />
            <Button onClick={handleAddAction}>
                Visualizar
            </Button>
        </div>
    );
};

export default Home;