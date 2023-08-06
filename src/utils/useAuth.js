import { useRecoilValue } from 'recoil';
import { isAuthAtom } from './auth';

const useAuth = () => {
  const isAuthenticated = useRecoilValue(isAuthAtom);
  return { isAuthenticated };
};

export default useAuth;
