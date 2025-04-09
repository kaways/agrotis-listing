import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from '@/pages/Register';
import DataList from '@/pages/DataList';
import Home from '@/pages/Home';
import { UserProvider } from '@/context/userContext';

export default function Rotation() {
    return (
        <Router>
            <UserProvider>
                <Routes>
                    <Route path="/listagem" element={<DataList />} />
                    <Route path="/cadastro" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="*" element={<Navigate to={"/home"} />} />
                </Routes>
            </UserProvider>
        </Router>
    );
}
