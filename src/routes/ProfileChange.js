import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EmailjsAPI from '../components/EmailjsAPI';
import Footer from '../components/Footer';
import { Auth, FireStore, Storage } from '../firebase';
import{ init } from 'emailjs-com';
import { reauthenticateWithCredential, signInWithEmailAndPassword, signOut, updateEmail } from 'firebase/auth';
import FirebaseAPI from '../components/FirebaseAPI';
import { useSelector } from 'react-redux';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    padding-top: 75px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Section = styled.section`
    width: 475px;
    border-radius: 12px;
    border: 2px solid ${props => props.theme.line};
    padding: 16px;
    display: flex;
    flex-direction: column;
    margin-bottom: 8px;
`
const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 24px;
`
const SubTitle = styled.div`

`
const InputContainers = styled.div`
    margin-top: 24px;
    width: 100%;
    &>div {
        width: 100%;
        padding: 0 8px;
        line-height: 20px;
        color: ${props => props.theme.color.second};
        display: flex;
        &>input:last-child {
            height: 40px;
            font-size: 14px;
            padding: 4px;
            border-radius: 12px;
            border:1px solid ${props => props.theme.line};
            color: ${props => props.theme.color.second};
            background-color: whitesmoke;
        }
    }
    margin-bottom: 16px;
`
const VerufyInput = styled.div`
    width: 50%;
    margin-bottom: 20px;
    &>div {
        padding: 0 8px;
        line-height: 20px;
        color: ${props => props.theme.color.second};
        display: flex;
    }
    &>div>input {
        width: 100px;
        height: 40px;
        padding: 4px 8px;
        background-color: whitesmoke;
        border-radius: 12px;
        border:1px solid ${props => props.theme.line};
        font-size: 16px;
        color: ${props => props.theme.color.second};
    }
    &>div>input:last-child {
        width: auto;
        margin-left: 10px;
    }
    &>div>input:focus{
        background-color:white;
    }
`
const ErrorContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    margin-top: 8px;
    &>p {
        font-size: 16px;
        font-weight: 600;
        color: ${props => props.theme.color.blue};
    }
`
const Input = styled.input`
    margin-left: 12px;
    &:hover {
        cursor: ${props => props.disabled ? null : 'pointer'}
    }
`
const EmailInput = styled.input`
    width: 100%;
    height: 40px;
    padding: 4px 8px;
    background-color: whitesmoke;
    border-radius: 12px;
    border:1px solid ${props => props.theme.line};
    font-size: 16px;
    color: ${props => props.theme.color.second};
    border-color: ${props => props.error === '' ? null : props.theme.color.blue };
    &:focus {
        background-color: white;
    }
`
const InputContainer = styled.div`
    width: 100%;
    margin-bottom: 16px;
    &>div {
        padding: 0 8px;
        line-height: 20px;
        color: ${props => props.theme.color.second};
        display: flex;
    }
    &>div>input {
        width: 100%;
        height: 40px;
        padding: 4px 8px;
        background-color: whitesmoke;
        border-radius: 12px;
        border:1px solid ${props => props.theme.line};
        font-size: 16px;
        color: ${props => props.theme.color.second};
    }
    &>div>input:focus{
        background-color:white;
    }

`
const LogInButton = styled.div`
    display: flex;
    align-items:center;
    justify-content: center;
    border: none;
    background-color: ${props => props.theme.color.main};
    width: auto;
    height: 30px;
    border-radius: 12px;
    color: white;
    margin: 0 42%;
`
const ImageArea = styled.div`
    align-items:center;
    margin: 16px 0;
    height: auto;
    width:auto;
    &>img {
        border-radius: 16px;
    }
`
const ImageChangeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const FileBox = styled.div`
    &>label {
        display: inline-block;
        padding: .5em .6em;
        font-size: inherit;
        line-height: normal;
        vertical-align: middle;
        background-color: ${props => props.theme.color.blue};
        color: white;
        cursor: pointer;
        border: 1px solid #ebebeb;
        border-bottom-color: #e2e2e2;
        border-radius: 0.8em;
        margin-bottom: 25px;
    }
    &>input {
        display: none;
    }
`
// 이메일 변경할 이메일 인증 => 이메일 변경
const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
function Email() {
    const [ currentEmail, setCurrentEmail ] = useState(Auth.currentUser.email)
    const [ password, setPassword ] = useState('');
    const [ emailToggle, setEmailToggle ] = useState(false);
    const [ titleToggle, setTitleToggle ] = useState(true);
    const [ error, setError ] = useState('');
    const [ files, setFiles ] = useState({
        detailImageFile: null,
        detailImageUrl: null,
    })
    const [ userData, setUserData ] = useState('')
    const user = useSelector( state => state.user.value)
    const navigate = useNavigate()

    useEffect(() => {
        FirebaseAPI.getUserInfo(user, setUserData)
    },[])


    const Login = () => {
        setError('')
        signInWithEmailAndPassword(Auth, currentEmail, password).then(() => {
            setTitleToggle(false)
            setPassword('')
        }).catch(e => setError(e.message))
    }

    const setImageFromFile = ({ file, setImageUrl }) => {
        let reader = new FileReader();
        reader.onload = function () {
           setImageUrl({ result: reader.result });
        };
        reader.readAsDataURL(file);
     };

    // 0. 현재 유저 데이터, uid 필요함 
    // 유저 프로필사진병경: 1. 기존 프로필 사진 유뮤 확인 1-1. 있다면 삭제  2. 프로필 사진 업로드  3. 프로필사진 주소 가져오기  4. 유저db에 프로필사진 등록하기
    const changeProfile = async () => {
        if(files.detailImageFile === null) {
            alert('이미지를 선택해주세요!')
        }else if (userData.image != undefined) {
            const profileImageRef = ref(Storage, `${userData.univ}/profile-image/${user}`)
            deleteObject(profileImageRef).then(()=>console.log("기존이미지 삭제"))
        }

        const imageRef = ref(Storage, `${userData.univ}/profile-image/${user}`)
        await uploadBytes(imageRef, files.detailImageFile).then( async(snapshot) => { // 2. 이미지 업로드
            console.log("프로필 사진 업로드")
            await getImageUrl(files.detailImageFile) // 3. 이미지 주소 가져오기
        })
    }

    const getImageUrl = async() => { // 3. 이미지 주소 가져오기
        const url = await getDownloadURL(ref( Storage, `${userData.univ}/profile-image/${user}`))
        .then(async(res) => {
            setUserProfileImage(res) // 4. 프로필 사진 등록하기
        })
    }
    
    const setUserProfileImage = async(imageUrl) => { // 4. 프로필 사진 등록하기
        const docRef = doc(FireStore, "Users_Info", user);
        await updateDoc(docRef, {
            image: imageUrl
        }).then(() => {
            navigate('/')
            alert('프로필 사진을 변경하였습니다.')
        })
    }

  return (
      <Container>
          <Section>
            <Title>{titleToggle ? "로그인" : "프로필 사진 변경"}</Title>
            <SubTitle>{titleToggle ? "우선 로그인을 다시 해주세요!" : "프로필사진을 선택해주세요!"}</SubTitle>
            {titleToggle 
            ? 
            <InputContainers  >
                <div ><label>이메일</label></div>
                <div>
                    <EmailInput type={'email'} value={currentEmail} readOnly currentEmail />
                </div>
            </InputContainers>
            : 
            <ImageChangeContainer>
                {files.detailImageFile && (
                <ImageArea>
                    <img src={files.detailImageUrl} width={'175px'} height={'175px'} />
                </ImageArea>)}
                <FileBox>
                    <label htmlFor='file' >이미지 선택</label>
                    <input 
                        onChange={ ({ target: { files } }) => {
                            if(files.length ) {
                                setImageFromFile({
                                    file: files[0],
                                    setImageUrl: ({ result }) => setFiles({detailImageFile: files[0], detailImageUrl: result})
                                })
                            }
                        }}
                        type="file" id='file' accept="image/png, image/jpeg" />
                </FileBox>
            </ImageChangeContainer>
            }

            {titleToggle ? 
            <InputContainer  >
                <div ><label>비밀번호</label></div>
                <div>
                    <input type={'password'} value={password} onChange={e => setPassword(e.target.value)} onClick={() => setPassword("")} autoFocus  />
                </div>
            </InputContainer>
            : null}
            
            {titleToggle ? 
            <LogInButton onClick={Login} >로그인</LogInButton>
            : 
            <LogInButton onClick={changeProfile} >변경하기</LogInButton>
            }
          <ErrorContainer>
                    <p>{error}</p>
            </ErrorContainer>
          </Section>
          <Footer />
      </Container>
  )
}

export default Email;
