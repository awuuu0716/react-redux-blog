import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectPosts, selectPaginate, getPosts } from '../../redux/blogSlice';

const Root = styled.div`
  width: 40%;
  margin: 0 auto;
`;
const PostContainer = styled.div`
  border-bottom: 1px solid rgba(0, 12, 34, 0.2);
  padding: 16px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  &:hover {
    background: rgba(200, 200, 200, 0.1);
  }
`;
const PostTitle = styled(Link)`
  max-width: 500px;
  font-size: 24px;
  color: #333;
  text-decoration: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const PostDate = styled.div`
  color: rgba(0, 0, 0, 0.8);
`;

const PaginateContainer = styled.ul`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0;
`;

const Paginate = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  margin: 0 10px;
  border: 1px solid #fbfbfb;
  border-radius: 3px;
  list-style: none;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    background: rgba(200, 200, 200, 0.1);
  }
`;

function Post({ post }) {
  return (
    <PostContainer>
      <PostTitle to={`/post/${post.id}`}>{post.title}</PostTitle>
      <PostDate>
        {post.createdAt && new Date(post.createdAt).toLocaleString()}
      </PostDate>
    </PostContainer>
  );
}

export default function HomePage() {
  const posts = useSelector(selectPosts);
  const paginate = useSelector(selectPaginate);
  const dispatch = useDispatch();

  useEffect(() => dispatch(getPosts(1)), [dispatch]);

  const handlePaginate = (page) => dispatch(getPosts(page));

  return (
    <Root>
      {posts.length > 0 ? (
        posts.map((post) => <Post post={post} key={post.id} />)
      ) : (
        <Post post={{ title: 'Loading...' }} />
      )}
      <PaginateContainer>
        {posts.length > 0 &&
          paginate.map((page) => (
            <Paginate onClick={() => handlePaginate(page)} key={page}>
              {page}
            </Paginate>
          ))}
      </PaginateContainer>
    </Root>
  );
}
