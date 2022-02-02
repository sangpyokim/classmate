import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { FireStore } from "../firebase";
import DDay from "./DDay";


const FirebaseAPI = {
    readDocuments: async(Univ, Board, limits = 100 ,setArticle, isMounted) => {

        const docRef = collection(FireStore, Univ, Board, '1')
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
            setArticle(list)
        }
        return true

    },
    getTodayPopularList: async(Univ, setPopularList, isMounted ) => { 
        const freeDocsRef = query(collection(FireStore, Univ, 'Free_board', '1'), where("date", '>', DDay(-7) ), orderBy("date" ,'desc')) //자유게시판 
        const secretdocsRef = query(collection(FireStore, Univ, 'Secret_board', '1'),where("date", '>', DDay(-7) ), orderBy("date" ,'desc')) //비밀게시판

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
          } else {
            // doc.data() will be undefined in this case
            alert("잘못된 접근!");
          }

    }
}

export default FirebaseAPI;
