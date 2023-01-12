import { collection, DocumentData, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { db } from '../utils/firebase'
import { Movie } from '../typings'

function useLikes(uid: string | undefined) {
  const [list, setList] = useState<DocumentData[] | Movie[]>([])

  useEffect(() => {
    if (!uid) return

    return onSnapshot(
      collection(db, 'customers', uid, 'liked'),
      (snapshot) => {
        setList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      }
    )
  }, [db, uid])

  return list
}

export default useLikes