import { deleteUser, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FirebaseAPI from '../components/FirebaseAPI';
import Footer from '../components/Footer';
import { Auth } from '../firebase';

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
    display: flex;
    align-items:center;
    justify-content: space-between;
    width: 100%;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 16px;
    &>div:last-child {
        display: flex;
        align-items:center;
        justify-content: center;
        font-size: 12px;
        border: none;
        background-color: ${props => props.theme.color.main};
        width: 70px;
        height: 30px;
        border-radius: 12px;
        color: white;
    }
`
const Profile = styled.div`
    display: flex;
    align-items:center;
`
const UserImgContainer = styled.div``
const UserImg = styled.img`
    width: 60px;
    height: 60px;
    border-radius: 8px;
    margin-right: 12px;
`
const Name = styled.div`
    font-size: 12px;
    margin-bottom: 4px;
    color: ${props => props.theme.color.third};
`
const Ident = styled.div`
    font-size: 16px;
    margin-bottom: 8px;
    color: ${props => props.theme.color.first};
    font-weight: 500;

`
const Univ = styled.div`
    font-size: 12px;
    margin-bottom: 4px;
    color: ${props => props.theme.color.third};
`
const SubTitle = styled.div`
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 24px;
`
const Item = styled.div`
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 20px;
    margin-left: 8px;
    &:hover {
        cursor: pointer;
    }
    &:last-child {
        margin-bottom: 0px;
    }
`

function My() {
    const [ userData, setUserData ] = useState('');
    const user = useSelector(state => state.user.value)
    const navigate = useNavigate();

    useEffect(() => {
        FirebaseAPI.getUserInfo(user, setUserData)
    }, []) 



    const deleteUserInfo = () => {
        if( window.confirm(`?????????????????????????${"\r\n"}????????? ????????? ?????? ???????????????, ??????????????? ????????? ????????????.` )) {
            deleteUser(Auth.currentUser).catch(e => alert(e))
        }
    }

  return(
      <>
      <Container>
        <Section>
            <Title>
                <div>?????????</div>
                <div onClick={() => window.confirm("???????????????????????????????") ? signOut(Auth) : null}  >????????????</div>
            </Title>
            <Profile>
                <UserImgContainer>
                    {userData.image == null ? <UserImg src="https://firebasestorage.googleapis.com/v0/b/classmate-e.appspot.com/o/default_image.png?alt=media&token=c2ca3608-9fea-4021-82f7-bb5640bbbba9" /> : <UserImg src={userData.image} />}
                </UserImgContainer>
                <div>
                    <Ident>
                        {userData.id}
                    </Ident>
                    <Name>
                        {userData.name} / {userData.nickname}
                    </Name>
                    <Univ>
                        {userData.univ} {userData && userData.studentId.substring(2,4)}??????
                    </Univ>
                </div>
            </Profile>
        </Section>

        <Section>
            <SubTitle>??????</SubTitle>
            <Item onClick={() => navigate('email')} >????????? ??????</Item>
            <Item onClick={() => navigate('password')} >???????????? ??????</Item>
            <Item onClick={() => navigate('profile')} >????????? ?????? ??????</Item>
        </Section>

        <Section>
            <SubTitle>????????????</SubTitle>
            <Item onClick={() => navigate('nickname')} >????????? ??????</Item>
            <Item>????????? ??????</Item>
            <Item>?????? ?????? ??????</Item>
            <Item>???????????? ????????????</Item>
        </Section>

        <Section>
            <SubTitle>????????????</SubTitle>
            <Item>????????????</Item>
            <Item>????????????</Item>
            <Item>????????? ????????????</Item>
            <Item>???????????? ????????????</Item>
        </Section>

        <Section>
            <SubTitle>??????</SubTitle>
            <Item onClick={() => deleteUserInfo()} >?????? ??????</Item>
        </Section>
          <Footer />
      </Container>
      </>
  )
}

export default My;
