import { createContext,useContext, useState, } from "react";

const CategoryContext = createContext();

export const CategoryProvider = ({children}) =>{
    const [selectCategory,setSelectCategory] = useState("All")

    return(
        <CategoryContext.Provider value={{selectCategory,setSelectCategory}}>
             {children}
        </CategoryContext.Provider>
    )


}

export const useCategory = ()=>useContext(CategoryContext)