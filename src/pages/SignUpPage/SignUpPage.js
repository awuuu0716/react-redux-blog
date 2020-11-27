import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { signUp, getMe } from '../../WebAPI';
import { setAuthToken } from '../../utils';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/blogSlice';

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

export default function SignUpPage() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isSubmit = useRef(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    setErrorMessage('');
    e.preventDefault();
    if (isSubmit.current) return;
    isSubmit.current = true;
    signUp(nickname, username, password).then((data) => {
      if (data.ok === 0) return setErrorMessage(data.message);
      setAuthToken(data.token);
      getMe().then((response) => {
        if (response.ok !== 1) {
          setAuthToken('');
          return setErrorMessage(response.toString());
        }
        dispatch(setUser(response.data));
        history.push('/');
        isSubmit.current = false;
      });
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        nickname:
        <input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
      </div>
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

      <button type="submit">Sign Up</button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Form>
  );
}
