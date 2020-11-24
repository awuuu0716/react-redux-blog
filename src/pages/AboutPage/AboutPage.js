import styled from 'styled-components';

const Root = styled.div`
  width: 40%;
  margin: 0 auto;
  padding-top: 50px;
`;

const AboutTitle = styled.div`
  font-size: 48px;
  font-weight: bold;
  text-align: center;
  color: #333;
  margin: 10px 0;
`;

const AboutBody = styled.div`
  font-size: 24px;
  color: #333;
`;

export default function AboutPage() {
  return (
    <Root>
      <div>
        <AboutTitle>About This Blog</AboutTitle>
        <AboutBody>A blog that made up with React, still practing T_T.</AboutBody>
      </div>
    </Root>
  );
}
