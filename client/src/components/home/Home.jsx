import React from 'react'
//packages
import styled from "styled-components"
import Haeder from '../includes/Header';
import Feed from '../feed/Feed';
import ProfilePage from '../profile/ProfileBox';

function Home() {
  return (
    <>
      <Haeder />
     <MainContainer>
      <Wrapper className='wrapper'>
		<ProfilePage />
		<Feed />
      </Wrapper>
     </MainContainer>
    </>
   
  )
}

export default Home

const MainContainer = styled.section`
  width: 100%;
  height: 100vh;
  padding-top: 80px;
  background-color: #eee9e9;
`;

const Wrapper = styled.section`
  padding-top: 25px;
  display: flex;
  justify-content: space-between;
`;