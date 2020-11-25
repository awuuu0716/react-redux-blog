import { useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectPost, getPost, setPost } from '../../redux/blogSlice';

const Root = styled.div`
  width: 40%;
  margin: 0 auto;
  padding-top: 50px;
`;

const PostTitle = styled.div`
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
`;

export default function PostPage() {
  const post = useSelector(selectPost);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
    return () => dispatch(setPost(null));
  }, []);

  return (
    <Root>
      <div>
        <PostTitle>{post && post.title}</PostTitle>
        <PostDate>{post && new Date(post.createdAt).toLocaleString()}</PostDate>
        <PostBody>{post && post.body}</PostBody>
      </div>
    </Root>
  );
}
