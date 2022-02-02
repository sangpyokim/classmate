import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FireStore, Storage } from '../firebase';

const MainContentContainer = styled.div`
    width: 800px;
`
const WritingContainer = styled.form`
    border: 2px solid ${props => props.theme.line};
    margin-bottom: 4px;
    &>input:first-child {
        border: none;
        border-bottom: 1px solid ${props => props.theme.line};
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        padding-left: 8px;
        font-weight: 600;
        font-size: 16px;
        color: ${props => props.theme.color.first};
    }
    &>div:last-child {
        height: 34px;
        display: flex;
        align-items:center;
        justify-content: space-between;
        padding: 0 0 0 8px;
        color: ${props => props.theme.color.third};
        &>div>input:last-child {
            position: relative;
            top: -2px;
            left: 1px;
            background-color: ${props => props.theme.color.main};
            height: 37px;
            width: 38px;
            border: none;
            color: white;
        }
        &>div>input:last-child:hover {
            color: ${props => props.theme.color.main};
            background-color: white;
            font-weight: 600;
            border: 1px solid ${props => props.theme.color.main};
        }
    }
`

const Textarea = styled.textarea`
    resize: none;
    border: none;
    height: 250px;
    width: 100%;
    border-bottom: 1px solid ${props => props.theme.line};
    padding: 8px;
    color: ${props => props.theme.color.first};
`
const ImageArea = styled.div`
    height: 100px;
    width: 100%;
    display:flex;
    align-items:center;
    padding-left: 12px;
    border-bottom: 1px solid ${props => props.theme.line};
`
const Day = ['일요일', "월요일", "화요일", "수요일", '목요일', '금요일', '토요일' ]
// 무슨 타입?( create or update ), univ, board
function Writting({ type , univ, board}) {
    const [ title, setTitle ] = useState('')
    const [ contents, setContents ] = useState('')
    const [ userdata, setUserData] = useState()
    const [ files, setFiles ] = useState({
        detailImageFile: null,
        detailImageUrl: null,
    })

    let navigate = useNavigate()
    const params = useParams()
    //유저 정보가져오기

    const user = useSelector( state => state.user.value)
    const getUserInfo = async () => {
        const docRef = doc(FireStore, "Users_Info", user);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            alert("잘못된 접근!");
          }
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    // 이미지 미리보기
    const setImageFromFile = ({ file, setImageUrl }) => {
        let reader = new FileReader();
        reader.onload = function () {
           setImageUrl({ result: reader.result });
        };
        reader.readAsDataURL(file);
     };


     const setDocuments = async(imageUrl= null) => {
        console.log("게시글 등록 시작, 90%")
        //작성날짜
        const dat = new Date()
        const currentDate = `${dat.getFullYear()}년 ${dat.getMonth()+1}월 ${dat.getDate()}일 ${dat.getHours()}시 ${dat.getMinutes()}분 ${dat.getSeconds()}초 ${Day[dat.getDay()]} `
        // 문서의 개수
        const docs = await getDocs(collection(FireStore, univ, board, '1'))
        const docRef = doc(FireStore, univ, board, '1', `${type === 'create' ? docs.size + 1 : params.id}`)
        await  type === 'create' ? setDoc(docRef, { 
            id: docs.size + 1,
            user: userdata,
            uid: user,
            title,
            contents,
            date: currentDate,
            image: imageUrl,
            shown: true,
            heart:[],
            board: '자유게시판'
         }) : updateDoc(docRef, {
            title,
            contents,
            image: imageUrl,
         })
        console.log("게시글 등록완료, 100%")
        navigate('/')
    }

    const setStorage = async(file, id) => {
        console.log("파일 업로드 시작, 10%")
        if(file == null) {
            return setDocuments(file)
        }
        const imageRef = ref(Storage, `${univ}/${board}/${id}/${user}-${id}`)
        await uploadBytes(imageRef, file).then( async(snapshot) => {
            console.log("파일업로드 완료, 30%")
            await getImageUrl(file, id)
        })
    }
    //삭제 후 재등록!
    const updateStorage = async(id) => {
        if(files.detailImageFile === null) {
            return setDocuments()
        }
        // 문서에 image check
        const docRef = doc(FireStore, univ, board, '1', `${id}`)
        const docSnap = await getDoc(docRef);
        if(docSnap.data().image === null) {
            return setStorage(files.detailImageFile, id)
        }
        
        //삭제
        const imageRef = ref(Storage, `${univ}/${board}/${id}/${user}-${id}`);
        deleteObject(imageRef).then(() => {
            console.log("이미지 삭제완료.")
            setStorage(files.detailImageFile, id)
        }).catch(e => alert("a"))

    }
    const getImageUrl = async(file, id) => {
        console.log("이미지 주소 불러오기 시작, 50%")
        const url = await getDownloadURL(ref( Storage, `${univ}/${board}/${id}/${user}-${id}`))
            .then(async(res) => {
                setDocuments(res)
            }).then(res => console.log("이미지 주소 불러오기 완료, 70%"))
    }

    //유효성검사
    const setDocument = async(e) => {
        e.preventDefault()

        if ( title.length < 1 || contents.length < 1 ) {
            return alert("내용을 입력해주세요.")
        }

        const docs = await getDocs(collection(FireStore, univ, board, '1'))

        window.confirm("글을 게시하겠습니까?")
        && type === 'create' ? await setStorage(files.detailImageFile, docs.size+1) : await updateStorage(params.id)
    }



  return (
    <WritingContainer onSubmit={(e) => setDocument(e)} >
        <input type="text" placeholder='글 제목' maxLength={20} value={title} onChange={e =>setTitle(e.target.value)} />
        <div><Textarea placeholder='글 내용을 작성해주세요!' value={contents} onChange={(e) => setContents(e.target.value)} /></div>

        {
            files.detailImageFile && (
                <ImageArea>
                    <img src={files.detailImageUrl} width={'75px'} height={'75px'} />

                </ImageArea>

            )
        }

        <div>
            <input 
                onChange={ ({ target: { files } }) => {
                    if(files.length ) {
                        setImageFromFile({
                            file: files[0],
                            setImageUrl: ({ result }) => setFiles({detailImageFile: files[0], detailImageUrl: result})
                        })
                    }
                }}
                type="file" id='file' accept="image/png, image/jpeg" multiple />
            <div>
                <input type={"submit"} value="작성" />
            </div>
        </div>
    </WritingContainer>
  )
}

export default Writting;
