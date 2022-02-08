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
        if( window.confirm(`삭제하시겠습니까?${"\r\n"}삭제된 회원은 복구 불가능하며, 활동흔적은 그대로 남습니다.` )) {
            deleteUser(Auth.currentUser).catch(e => alert(e))
        }
    }

  return(
      <>
      <Container>
        <Section>
            <Title>
                <div>내정보</div>
                <div onClick={() => window.confirm("로그아웃하시겠습니까?") ? signOut(Auth) : null}  >로그아웃</div>
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
                        {userData.univ} {userData && userData.studentId.substring(2,4)}학번
                    </Univ>
                </div>
            </Profile>
        </Section>

        <Section>
            <SubTitle>계정</SubTitle>
            <Item onClick={() => navigate('email')} >이메일 변경</Item>
            <Item onClick={() => navigate('password')} >비밀번호 변경</Item>
            <Item onClick={() => navigate('profile')} >프로필 사진 변경</Item>
        </Section>

        <Section>
            <SubTitle>커뮤니티</SubTitle>
            <Item onClick={() => navigate('nickname')} >닉네임 설정</Item>
            <Item>게시판 관리</Item>
            <Item>이용 제한 내역</Item>
            <Item>커뮤니티 이용규칙</Item>
        </Section>

        <Section>
            <SubTitle>이용안내</SubTitle>
            <Item>문의하기</Item>
            <Item>공지사항</Item>
            <Item>서비스 이용약관</Item>
            <Item>개인정보 처리방침</Item>
        </Section>

        <Section>
            <SubTitle>기타</SubTitle>
            <Item onClick={() => deleteUserInfo()} >회원 탈퇴</Item>
        </Section>
          <Footer />
      </Container>
      </>
  )
}

export default My;
