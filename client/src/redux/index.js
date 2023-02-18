import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    user :JSON.parse(localStorage.getItem("user_info")) ? JSON.parse(localStorage.getItem("user_info")) : null,
    token : JSON.parse(localStorage.getItem("user_data")) ? JSON.parse(localStorage.getItem("user_data")) :  null,
    posts : [],
}

export const authSlice = createSlice({
    name : "data",
    initialState,
    reducers : {
        setLogin : (state, action) => {
            state.token = action.payload
            localStorage.setItem("user_data", JSON.stringify(state.token))
        },
        setUserInfo : (state, action) => {
            state.user = action.payload;
            localStorage.setItem("user_info", JSON.stringify(state.user))
        },
        setLogout : (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("user")
            localStorage.removeItem("user_data")
        },
        setFriends : (state, action) => {
            if(state.user) {
                state.user.friends  = action.payload.friends
                localStorage.setItem("friends", JSON.stringify(state.user.friends))
            }
            else {
                console.error("user friends non-existent")
            }
        },
        setPosts : (state, action) => {
            state.posts = action.payload.posts
        },
        setPost : (state, action) => {
            const updatedPosts  = state.posts.map((post) => {
                if(post._id === action.payload.post_id) {
                    return action.payload.post
                }
                else {
                    return post
                } 
            })
            state.posts = updatedPosts
        }
    }
})


export const {setMode, setLogin,setUserInfo, setLogout, setFriends, setPost, setPosts} = authSlice.actions
export default authSlice.reducer 