import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FireStore, Storage } from '../firebase';
import FirebaseAPI from './FirebaseAPI';

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
const Label = styled.label`
    font-size: 12px;
    padding-right: 12px;
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
const Day = ['?????????', "?????????", "?????????", "?????????", '?????????', '?????????', '?????????' ]
// ?????? ???????( create or update ), userdata.univ, board
function Writting({ type, board, boardName}) {
    const [ title, setTitle ] = useState('')
    const [ contents, setContents ] = useState('')
    const [ userdata, setUserData] = useState()
    const [ anonymous, setAnonymous ] = useState(false);
    const [ files, setFiles ] = useState({
        detailImageFile: null,
        detailImageUrl: null,
    })

    let navigate = useNavigate()
    const params = useParams()

    const user = useSelector( state => state.user.value)

    useEffect(() => {
        FirebaseAPI.getUserInfo(user, setUserData)
    }, [])

    // ????????? ????????????
    const setImageFromFile = ({ file, setImageUrl }) => {
        let reader = new FileReader();
        reader.onload = function () {
           setImageUrl({ result: reader.result });
        };
        reader.readAsDataURL(file);
     };


     const setDocuments = async(imageUrl= null) => {
        console.log("????????? ?????? ??????, 90%")
        //????????????
        const dat = new Date()
        const currentDate = `${dat.getFullYear()}??? ${dat.getMonth()+1}??? ${dat.getDate()}??? ${dat.getHours()}??? ${dat.getMinutes()}??? ${dat.getSeconds()}??? ${Day[dat.getDay()]} `
        // ????????? ??????
        const docs = await getDocs(collection(FireStore, userdata.univ, board, '1'))
        const docRef = doc(FireStore, userdata.univ, board, '1', `${type === 'create' ? docs.size + 1 : params.id}`)
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
            board: boardName,
            anonymous
         }) : updateDoc(docRef, {
            title,
            contents,
            image: imageUrl,
            anonymous
         })
        console.log("????????? ????????????, 100%")
        navigate('/')
    }

    const setStorage = async(file, id) => {
        console.log("?????? ????????? ??????, 10%")
        if(file == null) {
            return setDocuments(file)
        }
        const imageRef = ref(Storage, `${userdata.univ}/${board}/${id}/${user}-${id}`)
        await uploadBytes(imageRef, file).then( async(snapshot) => {
            console.log("??????????????? ??????, 30%")
            await getImageUrl(file, id)
        })
    }
    //?????? ??? ?????????!
    const updateStorage = async(id) => {
        // ????????? image check
        if(files.detailImageFile === null) {
            return setDocuments()
        }
        const docRef = doc(FireStore, userdata.univ, board, '1', `${id}`)
        const docSnap = await getDoc(docRef);
        if(docSnap.data().image === null) {
            return setStorage(files.detailImageFile, id)
        }
        
        //??????
        const imageRef = ref(Storage, `${userdata.univ}/${board}/${id}/${user}-${id}`);
        deleteObject(imageRef).then(() => {
            console.log("????????? ????????????.")
            setStorage(files.detailImageFile, id)
        }).catch(e => alert("a"))

    }
    
    const getImageUrl = async(file, id) => {
        console.log("????????? ?????? ???????????? ??????, 50%")
        const url = await getDownloadURL(ref( Storage, `${userdata.univ}/${board}/${id}/${user}-${id}`))
            .then(async(res) => {
                setDocuments(res)
            }).then(res => console.log("????????? ?????? ???????????? ??????, 70%"))
    }

    //???????????????
    const setDocument = async(e) => {
        e.preventDefault()

        if ( title.length < 1 || contents.length < 1 ) {
            return alert("????????? ??????????????????.")
        }

        const docs = await getDocs(collection(FireStore, userdata.univ, board, '1'))

        window.confirm("?????? ??????????????????????")
        && type === 'create' ? await setStorage(files.detailImageFile, docs.size+1) : await updateStorage(params.id)
    }


  return (
    <WritingContainer onSubmit={(e) => setDocument(e)} >
        <input type="text" placeholder='??? ??????' maxLength={20} value={title} onChange={e =>setTitle(e.target.value)} />
        <div><Textarea placeholder='??? ????????? ??????????????????!' value={contents} onChange={(e) => setContents(e.target.value)} /></div>

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
                <Label htmlFor='??????' >
                    <input type={'checkbox'} id='??????' value={anonymous} onClick={(e) => setAnonymous(prev => !prev)} />
                    ??????
                </Label>
                <input type={"submit"} value="??????" />
            </div>
        </div>
    </WritingContainer>
  )
}

export default Writting;
