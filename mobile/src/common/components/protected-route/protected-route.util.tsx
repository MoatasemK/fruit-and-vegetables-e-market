import { jwtDecode } from 'jwt-decode';

export function isAuthenticated() {
  const jwtToken = localStorage.getItem('jwtToken') as string;
  try {
    jwtDecode(jwtToken);

    return true;
  } catch (err) {
    return false;
  }
}
