import { useNavigate } from 'react-router-dom';
import { isAuthAtom } from '../../utils/auth';
import { useRecoilState } from 'recoil';

function HeaderDash() {
    const nav = useNavigate();
    const handleLogout = () => {
        // Perform the logout process here (e.g., clear tokens, session, etc.)
        // For example:
        localStorage.removeItem('token');
        localStorage.removeItem('userType');
        localStorage.removeItem('userEmail');
        nav('/login');
    };

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <div className="buttons">
                <button className="button" onClick={handleLogout}>Log Out</button>
                <button className="button" onClick={() => nav('profile')}> Profile </button>
                <button className="button" onClick={() => nav('passwordChange')}> Change password </button>
            </div>
        </div>
    );


}
export default HeaderDash;