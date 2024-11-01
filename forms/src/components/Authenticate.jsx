import { useState } from 'react';
import axios from 'axios';

const Authenticate = ({ token, setToken }) => {
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUserName] = useState(null);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    try {
      const response = await axios.get(
        'https://fsa-jwt-practice.herokuapp.com/authenticate',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = response.data;
      console.log(result);
      setSuccessMessage(result.message);
      setUserName(result.data.username);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h2>Authenticate!</h2>
      {successMessage && <p>{successMessage}</p>}
      {username && <p>Welcome, {username}!</p>}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token</button>
    </>
  );
};

export default Authenticate;
