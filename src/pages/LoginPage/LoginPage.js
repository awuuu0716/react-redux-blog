import { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIsSubmit, login } from '../../redux/blogSlice';

const ErrorMessage = styled.div`
  color: red;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 500px;
  height: 120px;
  padding: 20px;
  margin: 100px auto;
  border: 1px solid #fbfbfb;
  box-shadow: 1px 1px 3px #fbfbfb;
`;

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    dispatch(login(username, password));
    history.push('/');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        username:
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        password:
        <input
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Log in</button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Form>
  );
}
