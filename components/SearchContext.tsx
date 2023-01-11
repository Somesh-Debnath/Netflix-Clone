import { useContext,createContext,useState } from "react";

type SearchContextType={
    searchItem:string
    setSearchItem:(searchItem:string)=>void
}

export const useSearch=()=>useContext(SearchContext)

const SearchContext=createContext<SearchContextType>({} as SearchContextType)

export const SearchProvider=({children}:{children:React.ReactNode})=>{
    const [searchItem,setSearchItem]=useState('')
    return(
        <SearchContext.Provider value={{searchItem,setSearchItem}}>
            {children}
        </SearchContext.Provider>
    )
}