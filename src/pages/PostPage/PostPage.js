import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getPost } from '../../WebAPI';
import { useParams } from 'react-router-dom';

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
  const [postData, setPostData] = useState('');
  const { id } = useParams();

  useEffect(() => {
    getPost(id).then((post) => setPostData(post[0]));
  }, []);

  return (
    <Root>
      <div>
        <PostTitle>{postData && postData.title}</PostTitle>
        <PostDate>
          {postData && new Date(postData.createdAt).toLocaleString()}
        </PostDate>
        <PostBody>{postData.body || ''}</PostBody>
      </div>
    </Root>
  );
}
