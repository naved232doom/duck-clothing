import React from 'react';

import SignIn from '../../components/sign-in/sign-in.component';
import Signup from '../../components/sign-up/sign-up.component'
import './sign-in-and-sign-up-component.scss';

const SignAndSignUpPage =()=>(
    <div className='sign-in-and-sign-up'>
        <SignIn> </SignIn>
        <Signup> </Signup>
    </div>
);

export default SignAndSignUpPage;