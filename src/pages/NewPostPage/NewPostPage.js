import { useState, useRef } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { newPost } from '../../WebAPI';

const ErrorMessage = styled.div`
  color: red;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  width: 800px;
  padding: 20px;
  margin: 60px auto;
  border: 1px solid #fbfbfb;
  box-shadow: 1px 1px 3px #fbfbfb;
`;

const InputContainer = styled.div`
  width:100%;
`;

const InputTitle = styled.input`
  border: none;
  font-size: 40px;
  font-weight: bold;
  outline: none;
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid rgba(0, 0, 0, 0);
  transition: border 0.2s ease-in-out;

  &:focus {
    border-bottom: 2px solid rgba(0, 0, 0, 0.2);
  }
`;

const InputStory = styled.textarea`
  width: 100%;
  border: none;
  font-size: 24px;
  outline: none;
  resize: none;
`;

const SubmitButton = styled.button`
  width: 80px;
  height: 35px;
  border: none;
  outline: none;
  background: rgb(26, 137, 23);
  cursor: pointer;
  border-radius: 5px;
  color: #fff;

  &:hover {
    background: rgb(12, 110, 15);
  }
`;



export default function NewPostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();
  const isSubmit = useRef(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmit.current) return
    isSubmit.current = true;
      newPost(title, content).then((response) => {
        if (response.ok === 0) return setErrorMessage(response.message);
        history.push('/');
        isSubmit.current = false;
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputContainer>
        <InputTitle
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </InputContainer>
      <InputContainer>
        <InputStory
          rows="10"
          placeholder="Tell your story..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </InputContainer>
      <SubmitButton type="submit">Submit</SubmitButton>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </Form>
  );
}
