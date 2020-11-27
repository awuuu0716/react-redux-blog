import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectPost,
  getPost,
  setPost,
  deletePost,
  selectUser,
} from '../../redux/blogSlice';

const Root = styled.div`
  width: 40%;
  margin: 0 auto;
  padding-top: 50px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 48px;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
  margin-bottom: 20px;
`;

const PostBody = styled.div`
  font-size: 24px;
  color: #333;
  max-width: 600px;
  word-wrap: break-word;
`;

const Button = styled.button`
  font-size: 20px;
  border: 1px solid #333;
  border-radius: 3px;
  background: white;
  color: #333;
  cursor: pointer;
  transition: all 0.1s ease-in-out;

  &:hover {
    background: red;
    color: white;
  }

  & + & {
    margin-left: 10px;

    &:hover {
      background: green;
      color: white;
    }
  }
`;

const Title = styled.h1`
  font-size: 32px;
  max-width: 600px;
  color: #333;
  word-wrap: break-word;
`;

export default function PostPage() {
  const user = useSelector(selectUser);
  const post = useSelector(selectPost);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
    return () => dispatch(setPost(null));
  }, [dispatch, id]);

  const handleDelete = (id) => {
    dispatch(deletePost(id)).then(() => history.push('/'));
  };

  const handleEdit = (id) => {
    history.push(`/edit/${id}`);
  };

  return (
    <Root>
      <div>
        <TitleContainer>
          <Title>{post && post.title}</Title>
          {user && (
            <div>
              <Button onClick={() => handleDelete(id)}>Delete</Button>
              <Button onClick={() => handleEdit(id)}>Edit</Button>
            </div>
          )}
        </TitleContainer>
        <PostDate>{post && new Date(post.createdAt).toLocaleString()}</PostDate>
        <PostBody>{post && post.body}</PostBody>
      </div>
    </Root>
  );
}
