import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectErrorMessage,
  login,
  setErrorMessage,
  selectIsLogin,
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

export default function LoginPage() {
  const errorMessage = useSelector(selectErrorMessage);
  const isLogin = useSelector(selectIsLogin);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setErrorMessage(''));
    dispatch(login(username, password));
  };

  useEffect(()=>{
    console.log(isLogin);
  })
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
