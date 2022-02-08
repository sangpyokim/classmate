import { arrayUnion, collection, doc, getDoc, getDocs, limit, onSnapshot, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { FireStore } from "../firebase";
import DDay from "./DDay";

const Day = ['일요일', "월요일", "화요일", "수요일", '목요일', '금요일', '토요일' ]
const FirebaseAPI = {
    readDocuments: async(uid, Board, limits ,setArticle, isMounted) => {
        const userRef = doc(FireStore, 'Users_Info', uid)
        const docSnap = await getDoc(userRef);
        const docRef = collection(FireStore, docSnap.data().univ, Board, '1')
        const q = query(docRef, where('shown', '==', true), orderBy('id', 'desc'), limit(limits))
        const querySnapshot = await getDocs(q)

        const list = [];
        const ex = [];
        querySnapshot.forEach(doc => {
            if( ex.length === 19 || doc.data().id === 1 ) {
                ex.push(doc.data())
                list.push(ex.slice()) 
                ex.length= 0
            } else{ 
                ex.push(doc.data())
            }
        })
        if ( isMounted.current ) {
            if( list.length === 0 && ex.length > 1 ) {
                list.push(ex)
                setArticle(list)
            } else {
                setArticle(list)
        }
    }
        return true
    },
    getTodayPopularList: async(Univ, setPopularList, isMounted ) => { 
        const freeDocsRef = query(collection(FireStore, Univ, 'free-board', '1'), where("date", '>', DDay(-7) ), orderBy("date" ,'desc')) //자유게시판 
        const secretdocsRef = query(collection(FireStore, Univ, 'secret-board', '1'),where("date", '>', DDay(-7) ), orderBy("date" ,'desc')) //비밀게시판
    
        const freeQuerySnapshot = await getDocs(freeDocsRef)
        const secretQuerySnapshot = await getDocs(secretdocsRef)
        const popularList = [];
        freeQuerySnapshot.forEach( doc => {
            popularList.push(doc.data())
        })
        secretQuerySnapshot.forEach( doc => {
            popularList.push(doc.data())
        })
        popularList.sort( (a, b) => b.heart.length - a.heart.length)
        if ( isMounted.current ) {
            setPopularList(popularList.slice(0,2))
        }
    },
    getUserInfo: async( uid, setUserData ) => {
        const docRef = doc(FireStore, "Users_Info", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserData(docSnap.data());
        }else {
            // doc.data() will be undefined in this case
            alert("잘못된 접근!");
          }
    }, // 채팅: 1 채팅 불러온다! 
    // 경로: chat/ 나 / 너 / 채팅1
    sendChat: async(chat, user, uid, setChat, setChatToggle) => {
        if(chat === '') {
            alert("한글자이상 입력해주세요!")
        } else if ( window.confirm("상대방에게 익명으로 메세지가 보내집니다.")) {
            const dat = new Date()
            const currentDate = `${dat.getFullYear()}년 ${dat.getMonth()+1}월 ${dat.getDate()}일 ${dat.getHours()}시 ${dat.getMinutes()}분 ${dat.getSeconds()}초 ${Day[dat.getDay()]} `
            const q = doc(FireStore, 'Chat', user)
            const querySnapshot = await getDoc(q)



            if ( querySnapshot.data() === undefined ) {
                await setDoc(doc(FireStore, 'Chat', user,), {
                    date: currentDate,
                    chat,
                    uid,
                })
                .then( async()=> {
                    await setDoc(doc(FireStore, 'Chat', uid ), {
                        date: currentDate,
                        chat,
                        uid,
                    })
                })
                .then(() => {
                    setChat('')
                    setChatToggle(false)
                })

            }else {
                const list = []
                
                list.push(querySnapshot.data())
                await updateDoc(doc(FireStore, 'Chat', user,), {
                    date: currentDate,
                    chat: list,
                    uid,
                }).then( async()=> {
                    await updateDoc(doc(FireStore, 'Chat', uid ), {
                        date: currentDate,
                        chat: list,
                        user,
                    })
                }).then(() => {
                    setChat('')
                    setChatToggle(false)
                })
            }

        }
    },
}

export default FirebaseAPI;
