import { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  signUp,
  selectErrorMessage,
  setErrorMessage,
} from '../../redux/blogSlice';

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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const errorMessage = useSelector(selectErrorMessage);
  const isSubmit = useRef(false);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmit.current) return;
    isSubmit.current = true;
    dispatch(signUp({username, password, nickname})).then((res) => {
      isSubmit.current = false;
      if (res) history.push('/');
    });
  };

  useEffect(() => () => dispatch(setErrorMessage('')), [dispatch]);

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
