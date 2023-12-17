import { jwtDecode } from 'jwt-decode';

export function getCurrentLogginUserId() {
  try {
    const jwtToken = localStorage.getItem('jwtToken') as string;
    const currentUserId = (jwtDecode(jwtToken) as { id: string }).id;

    return currentUserId;
  } catch (error) {
    return '';
  }
}
