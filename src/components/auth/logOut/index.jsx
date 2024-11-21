import React from 'react';
import { doSignOut } from '../../../firebase/auth';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'; // Import the icon from Material-UI

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await doSignOut();
      alert('Logged out successfully!');
      window.location.href = '/'; // Redirect to the home page or login page after logout
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <button onClick={handleLogout} style={{ color :' white' ,display: 'flex', alignItems: 'center', cursor: 'pointer', border: 'none', background: 'none', padding: '8px', fontSize: '16px' }}>
      <LogoutRoundedIcon style={{ marginRight: '8px' }} />
    </button>
  );
};

export default LogoutButton;
