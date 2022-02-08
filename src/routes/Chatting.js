import { collection, collectionGroup, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EmailjsAPI from '../components/EmailjsAPI';
import Footer from '../components/Footer';
import { Auth, FireStore } from '../firebase';
import{ init } from 'emailjs-com';
import { signInWithEmailAndPassword, signOut, updateEmail } from 'firebase/auth';
import { useSelector } from 'react-redux';
import Timer from '../components/Timer';
import FirebaseAPI from '../components/FirebaseAPI';

const Container = styled.div`
    width: 100%;
    height: 100vh; 
    padding-top: 100px;
`
const Wrapper = styled.div`
    width: 100%;
    min-width: 1180px;
    display: flex;
    justify-content: center;
    height: 100%;
    min-height: 100%;
    margin-bottom: -75px;
    padding-bottom: 75px;
`
const MessageBox = styled.section`
    width: 350px;
    height: 100%;
    border-radius: 12px;
    border: 2px solid ${props => props.theme.line};
    padding: 16px;
    display: flex;
    flex-direction: column;
    margin-right: 28px;
`
const Messages = styled.section`
    width: 780px;
    height: 100%;
    border-radius: 12px;
    border: 2px solid ${props => props.theme.line};
    padding: 16px;
    display: flex;
    flex-direction: column;
`
const Title = styled.div`
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 24px;
`
const SubTitle = styled.div`
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 24px;
`
const Items = styled.div`
    overflow-y: auto;
`
const Item = styled.div`
    display: block;
    height: 60px;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    color: ${props => props.theme.color.third};
    &:hover {
        cursor: pointer;
    }


`
const Chats = styled.div`
    overflow-y: auto;

`
const Chat = styled.div`
    display: block;
    height: 80px;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
`

const Status = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &>div{
        color: ${props => props.send != undefined ? props.send ? '#ffcc1c' : "#0ca5af" : 'black'};
        font-weight:700;
    }
`
    // 1. chat/user 가져오자! -> 2. map으로 데이터 풀어주자
function Chatting() {
    const user = useSelector(state => state.user.value)
    
    const [ chatList, setChatList ] = useState()

    const getUserChats = async() => {
        const q = doc(FireStore, 'Chat', user)
        const querySnapshot = await getDoc(q)
        const list = []
        console.log(querySnapshot.data())
    }

    useEffect(()=>{
        getUserChats()

    }, [])
    

    return (
      <Container>
          <Wrapper>
            <MessageBox>
                <Title>쪽지함</Title>
                
                <Items>
                    
                

                </Items>
            </MessageBox>
            
            <Messages>
                <SubTitle>익명</SubTitle>
                <Chats>
                    <Chat>
                        <Status send={false} >
                            <div >
                                받은 쪽지
                            </div>
                            타이머
                        </Status>
                        <h3>가장 최근 채팅</h3>
                    </Chat>

                </Chats>
            </Messages>
          </Wrapper>
          <Footer />
      </Container>
  )
}

export default Chatting;
