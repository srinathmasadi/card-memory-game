import React,{useContext} from 'react';
import AuthContext from '../../context/auth/authContext';

import { useHistory } from 'react-router-dom';
import {
  HeroContainer,
  HeroContent,
  HeroItems,
  HeroBtn,
} from '../../assets/css/WelcomeElements';

const Welcome = () => {
  // declare and destructure authContext
  const authContext = useContext(AuthContext);

  const { isAuthenticated } = authContext;

  const history = useHistory();

  const handleButtonClick = () => {
    if (isAuthenticated) {
      history.push('/dashboard');
    } else {
      history.push('/signin');
    }
  };

  return (
    <HeroContainer>
      <HeroContent>
        <HeroItems>
          <HeroBtn onClick={handleButtonClick}>Play Now</HeroBtn>
        </HeroItems>
      </HeroContent>
    </HeroContainer>
  );
};

export default Welcome;
