import { Route, Routes, Navigate } from 'react-router-dom'
import Home from '../../Homepage/Home'
import Menu from '../../Menu/Menu'
import Delivery from '../../Delivery/Delivery'
import Party from '../../Party/Party'
import Careers from '../../Careers/Careers'
import News from '../../News/News'

const Navbar_Route = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="/Home" replace />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Menu" element={<Menu />} />
                <Route path="/Delivery" element={<Delivery />} />
                <Route path="/News" element={<News />} />
                <Route path="/Party" element={<Party />} />
                <Route path="/Careers" element={<Careers />} />
            </Routes>
        </div>
    )
}

export default Navbar_Route