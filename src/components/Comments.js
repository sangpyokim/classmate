import {  doc, getDoc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FireStore } from '../firebase';
import FirebaseAPI from './FirebaseAPI';
import Timer from './Timer';

const CommentWrapper = styled.a`
    display: flex;
    flex-direction: column;

`
const CommentContainer = styled.div`
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.line};
    padding: 12px;

`
const CommentUserWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    &>div:last-child {
        color: ${props => props.theme.color.third};
        font-size: 12px;
    }
`
const CommentUser = styled.div`
    display: flex;
    align-items: center;
    height: 35px;
    margin-bottom: 4px;
    font-size: 12px;
    &>div:first-child {
        font-size:22px;
        margin-right: 4px;
    }
`
const Comment = styled.div`
    margin-bottom:12px;
    color: ${props => props.theme.color.second};
    font-weight: 500;
    white-space: pre-wrap;
`
const TimerContainer = styled.div`
    color: ${props => props.theme.color.third};
    font-size: 12px;    
    display: flex;
`
const UserProfile = styled.img`
    width: 20px;
    height: 20px;
    border-radius: 4px;
    margin-right: 2px;
`
const ProfileContainer = styled.div`
`
const CommentDelete = styled.div`
    color: ${props => props.theme.color.blue};
    font-weight: 600;
    &:hover {
        cursor: pointer;
    }
`
const CommentHeartUp = styled.div`
    color: ${props => props.theme.color.main};
    font-weight: 600;
    &:hover {
        cursor: pointer;
    }`
const Hearts = styled.div`
    margin-left: 8px;
    font-size: 10px;
    display: flex;
    align-items: center;
    &>div{
        margin-left: 4px;
        font-size: 12px;
        font-weight: 600;
        color: ${props => props.theme.color.main};
    }
`
const StatusContainer = styled.div`
    display: flex;
    &>div {
        margin-left: 8px;
    }
`
const Anonymous = styled.div`
    color: ${props => props.article === props.user ? props.theme.color.blue : props.theme.color.second};
    font-weight: ${props => props.article === props.user ? "800" : "500"};
`
const Modal = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    align-items:center;
    justify-content:center;
    width: 100%;
    height: 100vh;
    background-color: rgba(25, 25, 25, 0.6);
    z-index: 10;


`
const ChatWrapper = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;    
    transform: translate(-50%, -50%);
    display: flex;
    justify-content:center;
    align-items: flex-end;
    flex-direction: column;
    padding: 24px;
    width: 350px;
    height: 200px;
    background-color: white;
    z-index: 11;
`
const ChatTitle = styled.div`
    display: flex;
    justify-content:space-between;
    width: 100%;
    font-size: 20px;
`
const TextArea = styled.textarea`
    resize: none;
    height: 200px;
    width: 100%;
    border: 1px solid ${props => props.theme.line};
    margin-top: 12px;
    margin-bottom: 12px;
    padding: 4px;
`
const ChatButton = styled.div`
    text-align: center;
    line-height: 24px;
    width: 50px;
    background-color: ${props => props.theme.color.main};
    border-radius: 8px;
    color: white;
`

function Comments() {
    const params = useParams()    
    const location = useLocation() // state 값 article
    const pathname= location.pathname.substring(1, location.pathname.lastIndexOf('/'))
    const [ articles, setArticle ] = useState();
    const [ count, setCount ] = useState(1);
    const [ commentUser, setCommentUser ] = useState()
    const [ chat, setChat ] = useState('');
    const [ chatToggle, setChatToggle ] = useState(false);
    const [ uID, setUID ] = useState('')
    const user = useSelector( state => state.user.value)

    useEffect(async() => {
        const userRef = doc(FireStore, 'Users_Info', user)
        const docSnap = await getDoc(userRef);
        const commentSnapshot = onSnapshot(doc(FireStore, docSnap.data().univ, pathname, '1', params.id), (doc) => {
              setArticle(doc.data())
              const list = []
              if (doc.data().comment != undefined ) {
                  doc.data().comment.map( res => list.push(res.uid))
                  const set = new Set(list)
                  const uniqArr = [...set]
                  setCommentUser(uniqArr.filter( uniq => uniq != doc.data().uid))
              }
        })

        return () => commentSnapshot()
   }, [params])

    const onClickCommentDelete = async(id) => {
        if( window.confirm("삭제하시겠습니까?") ) {
            const CommmentRef = doc(FireStore, '순천대학교', 'free-board', '1', params.id)
            const aa = await getDoc(CommmentRef)
            const commentData = aa.data().comment

            commentData[id].shown = false

            await updateDoc(CommmentRef, {
                comment: commentData
            })
        }
    }


    // 자추 가능!
    const onClickHeartUp = async(id) => {
        if( window.confirm("공감하시겠습니까?") ) {
            const userRef = doc(FireStore, 'Users_Info', user)
            const docSnap = await getDoc(userRef);
            const CommmentRef = doc(FireStore, docSnap.data().univ, pathname, '1', params.id)
            const aa = await getDoc(CommmentRef)
            const commentData = aa.data().comment

            if ( commentData[id].heart.every((heart) => heart != user)) {
                commentData[id].heart.push(user)
                await updateDoc(CommmentRef, {
                    comment: commentData
                })
                alert("공감하였습니다.")
            }else {
                alert("이미 공감하였습니다.")
            }

            
        }
    }
    

    // 맨처음에 댓글을의 uid를 배열에 다 저장함 => 중복 제거, 글쓴이 제거 => uid 배열 중에 없는 uid면 uid 배열에 추가하고 그 uid 인덱스값을 번호로 지정 잇는 uid면 인덱스값을 빈호로!
    return (
        <CommentWrapper>

        {articles && articles.comment != undefined && articles.comment.map( (article, index) => (
            article.shown ?
            <CommentContainer key={index} >
                <CommentUserWrapper>
                    <CommentUser>
                        {article.image == null ? <ProfileContainer><UserProfile src="https://firebasestorage.googleapis.com/v0/b/classmate-e.appspot.com/o/default_image.png?alt=media&token=c2ca3608-9fea-4021-82f7-bb5640bbbba9" /></ProfileContainer> : <ProfileContainer><UserProfile src={article.image} width={'20px'} /></ProfileContainer>}
                        <div>
                            {articles.uid === article.uid 
                                ? <div>(글쓴이)</div> 
                                : commentUser && commentUser.map( (users, index) => (
                                    users === article.uid 
                                    ? <Anonymous user={user} article={article.uid} key={index}>익명{index+1}</Anonymous> 
                                    : null
                                )) }
                        </div>
                    </CommentUser>
                    <StatusContainer>

                        { user === article.uid ? 
                        <CommentDelete onClick={() => onClickCommentDelete(index)} >
                            삭제
                        </CommentDelete>
                        :                         
                        <div onClick={() => {
                            setChatToggle(true)
                            setUID(article.uid)
                        }} >
                            쪽지
                        </div> }
                        <CommentHeartUp onClick={() => onClickHeartUp(index)} >
                            공감
                        </CommentHeartUp>
                    </StatusContainer>
                </CommentUserWrapper>
                {
                    chatToggle ? 
                    <>
                <Modal onClick={() => setChatToggle(false)} />
                    <ChatWrapper>
                            <ChatTitle>
                                <div onClick={() => console.log(article.uid, user)} >쪽지 보내기</div>
                                <div onClick={() => setChatToggle(false)} >X</div>
                            </ChatTitle>
                            <TextArea value={chat} onChange={e => setChat(e.target.value)} ></TextArea>
                            <ChatButton name={article.uid} onClick={() => FirebaseAPI.sendChat(chat, user, uID, setChat, setChatToggle)} >전송</ChatButton>
                    </ChatWrapper>
                </>
                : null
                }
                <Comment>
                    {article.comment}
                </Comment>
                <TimerContainer>
                    <Timer time={article.date} />

                    {article.heart.length === 0 ? null :
                    <Hearts>
                        ❤️  
                        <div>
                            {article.heart.length}
                        </div>
                    </Hearts>}
                </TimerContainer>
            </CommentContainer>
        : null
        ))}
    </CommentWrapper>
    )
}

export default Comments;
