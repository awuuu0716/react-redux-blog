import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { getUser, setIsLodingUser } from '../../redux/blogSlice';
import { getAuthToken } from '../../utils';
import styled from 'styled-components';
import LoginPage from '../../pages/LoginPage';
import SignUpPage from '../../pages/SignUpPage';
import HomePage from '../../pages/HomePage';
import PostPage from '../../pages/PostPage';
import NewPostPage from '../../pages/NewPostPage';
import AboutPage from '../../pages/AboutPage';
import EditPostPage from '../../pages/EditPostPage';
import Header from '../Header';

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (getAuthToken()) {
      dispatch(getUser());
      dispatch(setIsLodingUser(true));
    };
  }, []);

  return (
    <Root>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route path="/post/:id">
            <PostPage />
          </Route>
          <Route path="/new-post">
            <NewPostPage />
          </Route>
          <Route path="/edit/:id">
            <EditPostPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/sign-up">
            <SignUpPage />
          </Route>
        </Switch>
      </Router>
    </Root>
  );
}

export default App;
