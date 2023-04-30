import { useNavigate } from '@solidjs/router';
import { apiService } from '../../shared/api/swagger/swagger';
import { Button } from "../../components"

const MainHeader = () => {
    const navigate = useNavigate();

    const logout = () => {
        apiService.logout.Logout();

        navigate('/auth');
        localStorage.removeItem('user')
    };

    return (
        <header>
            <div className="header">
                <h1>TO DO APP (REACT)</h1>
                <Button onClick={logout} classNameOut="header__button">ВЫХОД</Button>
            </div>
        </header>
    )
}

export { MainHeader }