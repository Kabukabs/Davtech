export const Text =({
    as,
    style,
    clickFunc,
    children
})=>{
    const Component = as;
    return(
        <Component 
            className={style} 
            onClick={clickFunc && clickFunc}
            >
            {children}
        </Component>
    )
}