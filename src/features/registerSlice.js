import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialState: {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",

  },
};
// const signUpUser = createAsyncThunk("signUpUser", async( firstName,
//   lastName,
//   email,
//   phoneNumber,
//   password,
//   confirmPassword)=> {
//   const res = await fetch("http://192.168.1.8/api/Auth/Register",{
//     method: "post",
//     headers: {
//       "Content-Type": "application/json",
     
//   },
//   body: JSON.stringify({
//     firstName,
//     lastName,
//     email,
//     phoneNumber,
//     password,
//     confirmPassword

//   }),
//   })
//   return await res.json();
// })
export const registerSlice = createSlice({

    name: "register",
    initialState,
    reducers:{
      create:(state, action) => {
        state.firstName = action.payload.firstName
        state.lastName = action.payload.lastName
        state.email = action.payload.email
        state.phoneNumber = action.payload.phoneNumber
        state.password = action.payload.password
        state.confirmPassword = action.payload.confirmPassword       
        },
      }, 
      // extraReducers:{
      //   [signUpUser.pending]: (state,action)=>{
      //     state.loading = true
      //   },
      //   [signUpUser.fulfilled]: (state,{payload: {error, msg}})=>{
      //     state.loading = false;
      //     if(error){
      //       state.error = error
      //     }
      //     else{
      //       state.msg = msg
      //     }
      //   },
      //   [signUpUser.rejected]: (state,action) =>{
      //     state.loading = true
      //   },
        
      // }

             
});
export const { create } = registerSlice.actions;

export default registerSlice.reducer;