import React from 'react';
import emailjs from 'emailjs-com'



const EmailjsAPI = {
    sendEmail: (code, toEmail) => {
        // 코드, 이메일 주소
        emailjs.send('classmate_verifycode', 'template_verifycode', {
            verify_code: code,
            email: toEmail
       })
    },
    
}

export default EmailjsAPI;
