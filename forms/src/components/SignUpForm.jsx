import { useState } from 'react';
import axios from 'axios';

const SignUpForm = ({ token, setToken }) => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const change = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.username.length < 8) {
      setError('Username must be at least 8 characters long.');
      return;
    }

    try {
      const response = await axios.post(
        'https://fsa-jwt-practice.herokuapp.com/signup',
        {
          username: form.username,
          password: form.password,
        }
      );
      const data = response.data;
      console.log(data);
      setToken(data.token);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <h2>Sign Up!</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{' '}
          <input name="username" value={form.username} onChange={change} />
          <br />
          Password:{' '}
          <input name="password" value={form.password} onChange={change} />
          <br />
          <br />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
};

export default SignUpForm;
