import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RightAsides from '../components/RightAside';
import SearchInput from '../components/SearchInput';
import SubMenu from '../components/SubMenu';
import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore'
import { Auth, FireStore, Storage } from '../firebase';
import { getDownloadURL, list, listAll, ref, uploadBytes } from 'firebase/storage';
import { useSelector } from 'react-redux';
import Timer from '../components/Timer';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader'

const Container = styled.div`
    width: 100%;
`

const SubMenuContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 1180px;
    background-color: whitesmoke;
    border-bottom: 1px solid ${props => props.theme.line};
`
const ContentContainer = styled.div`
    width: 100%;
    min-width: 1180px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24px;
`
const Contents = styled.div`
    display: flex;
    justify-content: space-between;
    width: 1180px;
    padding: 0px 20px;
`
const MainContentContainer = styled.div`
    width: 800px;
`
const MainContentsTitle = styled.div`
    border: 1px solid ${props => props.theme.line};
    height: 60px;
    display: flex;
    align-items: center;
    font-size: 22px;
    font-weight: 600;
    padding-left: 12px;
    margin-bottom: 4px;
`
const SearchInputContainer = styled.div`
    height: 48px;
    width: 100%;
    margin-bottom: 4px;
    &>input {
        background-color: whitesmoke;
    }    
    &>input::placeholder {
        background-color: whitesmoke;
        font-weight: 500;
        color: ${props => props.theme.color.third};
    }
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
        height: 32px;
        display: flex;
        align-items:center;
        justify-content: space-between;
        padding: 0 0 0 8px;
        color: ${props => props.theme.color.third};
        &>input:last-child {
            position: relative;
            top: -1px;
            left: 2px;
            background-color: ${props => props.theme.color.main};
            height: 34px;
            width: 40px;
            border: none;
            color: white;
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
const FileContainer = styled.img`
    width: 50px;
    height: 50px;
`
const ImageArea = styled.div`
    height: 100px;
    width: 100%;
    display:flex;
    align-items:center;
    padding-left: 12px;
    border-bottom: 1px solid ${props => props.theme.line};
`
const MainContents = styled(Link)`
    height: 100px;
    padding: 8px;
    width: 100%;
    border: 1px solid ${props => props.theme.line};
    margin-bottom: 4px;
    display: flex;
    flex-direction:column;
    justify-content: space-evenly;
    &>div:first-child {
        font-size: 16px;
        font-weight: 500;
        color: ${props => props.theme.color.first};
    }
    &>div:nth-child(2) {
        font-weight: 400;
        color: ${props => props.theme.color.third};
    }
    &>div:last-child {
        font-size: 12px;
        font-weight: 500;
        color: ${props => props.theme.color.third};
        display: flex;
        &>div:last-child {
            margin-left: 8px;
            color: ${props => props.theme.color.second};
        }
    }
`

const Day = ['일요일', "월요일", "화요일", "수요일", '목요일', '금요일', '토요일' ]

function FreeBoard() {
    const [ userdata, setUserData ] = useState("")
    const [ loading, setLoading ] = useState(true);
    const [ writeToggle, setWriteToggle ] = useState(false);
    const [ title, setTitle ] = useState('');
    const [ contents, setContents ] = useState('')
    const [ files, setFiles ] = useState({
        detailImageFile: null,
        detailImageUrl: null,
    })
    const [ imageUrl, setImageUrl ] = useState('')
    const [ article, setArticle ] = useState([])

    // 현재 유저 정보가져오기
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

    // 문서 가져오기
    const getDocuments = async() => {
        const docRef = collection(FireStore, "Sunchon", 'Free_board', '1')
        const docs = await getDocs(docRef)
        const list = []
        docs.forEach( doc => {
            list.unshift(doc.data())
        })
        setArticle(list)
        setLoading(false)
    }

    
    useEffect(() => {
        getUserInfo()
        getDocuments()
    }, [])
    

    // 이미지 미리보기
    const setImageFromFile = ({ file, setImageUrl }) => {
        let reader = new FileReader();
        reader.onload = function () {
           setImageUrl({ result: reader.result });
        };
        reader.readAsDataURL(file);
     };

    // 파일 업로드
    const setStorage = async(file, id) => {
        if(file == null) {
            return null
        }
        const mountainRef = ref(Storage, `Sunchon/Free_board/${id}/${file.name}`)
        uploadBytes(mountainRef, file).then( snapshot => {
            console.log("업로드 성공")
            getImageUrl(file, id)
        })
    }
    
    const getImageUrl = async(file, id) => {
        console.log("시작")
        const url = await getDownloadURL(ref( Storage, `Sunchon/Free_board/${id}/${file.name}`))
        setImageUrl(url)
        console.log("성공", imageUrl)
    }
    
    // 문서 작성하기
    const setDocument = async(e) => {
        e.preventDefault()
        const dat = new Date()
        const currentDate = `${dat.getFullYear()}년 ${dat.getMonth()+1}월 ${dat.getDate()}일 ${dat.getHours()}시 ${dat.getMinutes()}분 ${dat.getSeconds()}초 ${Day[dat.getDay()]} `
        // 문서의 개수 
        const docs = await getDocs(collection(FireStore, "Sunchon", 'Free_board', '1'))

        window.confirm("글을 게시하겠습니까?") 
        && setStorage(files.detailImageFile, docs.size+1) 
        && await setDoc(doc(FireStore, 'Sunchon', 'Free_board', '1', `${docs.size + 1}`), { 
            id: docs.size + 1,
            user: userdata,
            title,
            contents,
            date: currentDate,
            image: imageUrl,
            shown: true
         }).then("작성완료!")
    }



  return (
      <Container>
          <SubMenuContainer>
            <SubMenu />
          </SubMenuContainer>

          <ContentContainer>
              <Contents>
                <MainContentContainer>
                    <MainContentsTitle>자유게시판</MainContentsTitle>
                    
                    {
                        writeToggle
                            ?
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
                                <input type={"submit"} value="작성" />
                            </div>

                        </WritingContainer>
                            :
                        <SearchInputContainer onClick={() => setWriteToggle(true)} >
                                <SearchInput placeholder='새 글을 작성해주세요!' />
                        </SearchInputContainer>

                    }

                    {
                        loading 
                        ? <Loader /> 
                        : article.map( article => ( article.shown ? 
                            
                            <MainContents key={article.id} to={`/free-board/${article.id}`} state={{article}} >
                                <div>{article.title}</div>
                                <div>{article.contents.substring(0, 50)}</div>
                                <div>
                                    <Timer time={article.date} />
                                    <div>
                                        익명
                                    </div>
                                </div>
                            </MainContents>
                            : null
                        ))
                    }

                </MainContentContainer>

                <RightAsides />
              </Contents>
          </ContentContainer>

      </Container>
  )
}

export default FreeBoard;
