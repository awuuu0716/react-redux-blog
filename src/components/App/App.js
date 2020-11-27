import { useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, setIsLodingUser, selectUser } from '../../redux/blogSlice';
import { getAuthToken } from '../../utils';
import styled from 'styled-components';
import Header from '../Header';
import LoginPage from '../../pages/LoginPage';
import SignUpPage from '../../pages/SignUpPage';
import HomePage from '../../pages/HomePage';
import PostPage from '../../pages/PostPage';
import NewPostPage from '../../pages/NewPostPage';
import AboutPage from '../../pages/AboutPage';
import EditPostPage from '../../pages/EditPostPage';

const Root = styled.div`
  padding-top: 64px;
`;

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getAuthToken()) {
      dispatch(getUser());
      dispatch(setIsLodingUser(true));
    }
  }, [dispatch]);

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
          <Route path="/new-post">{user && <NewPostPage />}</Route>
          <Route path="/edit/:id">{user && <EditPostPage />}</Route>
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
