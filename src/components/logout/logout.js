import { GoogleLogout } from 'react-google-login';
import React, { useState, useEffect } from "react";


const clientId = '334215639628-vu09cfq9ob860n6hj48vosfsdl545reo.apps.googleusercontent.com';

export default function Logout(props){

    const onSuccess = () => {
        console.log('Logout successfull!')
        props.setUserProfile(null)
    }

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText={'Logout'}
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
};