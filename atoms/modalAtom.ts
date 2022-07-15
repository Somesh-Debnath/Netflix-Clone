import { DocumentData } from "firebase/firestore"
import { atom } from "recoil"
import { Movie,TV } from "../typings"

export const modalState=atom({
    key:'modalState',
    default:false,
})
export const movieState=atom<Movie | DocumentData | null>({
    key:'movieState',
    default:null,
})
export const tvState=atom<TV | DocumentData | null>({
    key:'tvState',
    default:null,
})