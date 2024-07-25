import { useState } from "react"

export const useCustomToast =()=>{
    const[
        showToast,
        setShowToast
    ]=useState(false);
    const showCustomToast = (toastContainer) =>{

    }
    return{
        showToast,
        setShowToast
    }
}