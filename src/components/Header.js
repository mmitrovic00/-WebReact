import { useNavigate } from 'react-router-dom';
import { isAuthAtom } from '../utils/auth';
import { useRecoilState } from 'recoil';

function Header() {
    const nav = useNavigate();
    const goToRegistration = () => {
        nav('register');
    }

    const isAuth = useRecoilState(isAuthAtom);


    return (
        <div className="container">
            <h1>Welcome to My WebSho</h1>
            <div className="buttons">

                <button className="button" onClick={() => nav('login')}>
                    Log In
                </button>
                <button className="button" onClick={goToRegistration}>
                    Register
                </button>

            </div>
        </div>
    );


}
export default Header;