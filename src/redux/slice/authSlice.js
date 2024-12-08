import {createSlice} from "@reduxjs/toolkit";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {base_url} from "../../api/api";
import axios from "axios";



export let LoginInfo=createAsyncThunk("auth/loginInfo",async(data)=>{
    let res=await axios.get(base_url,data);
    console.log(res?.data);
    return res?.data;
})

export let RegInfo=createAsyncThunk("auth/RegInfo",async(data)=>{
    let res=await axios.post(base_url,data);
    console.log("registration is",res?.data);
    return res?.data;
})

export let fetchDetails=createAsyncThunk("auth/fetchDetails",async(myid)=>{
    let res=await axios.get(`${base_url}/${myid}`);
    console.log("fetched details is here",res.data);
    return res?.data
})

export let resetPassword=createAsyncThunk("auth/resetPassword",async(data)=>{
    let res=await axios.patch(`${base_url}/${data.id}`,
        {
            id:data.id,
            password:data.password,
            email:data.email
        }
    )
    return res?.data
})

export const authSlice=createSlice({

    name:"auth",
    initialState:
    {
        isLoading: false,
        status: 0,
        data: [],
        data2:[],
        isLoggedIn: false,
    },

    extraReducers: (builder) => {
    
        builder.addCase( LoginInfo.pending, (state) => {
        state.isLoading = true;  
      });
    
        builder.addCase(LoginInfo.fulfilled, (state, action) => {
          state.isLoading = false;
          state.status = action.payload.status;  
          state.data = action.payload;
          state.isLoggedIn = true;
          console.log("fulfill is",action)
        });
    
        builder.addCase(LoginInfo.rejected, (state) => {
          state.isLoading = false;
          state.isLoggedIn = false;
        });

        builder.addCase(RegInfo.pending, (state) => {
            state.isLoading = true;  
        });
        
        builder.addCase(RegInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.status;  
            state.data = action.payload;
            console.log("fulfill is",action)
        });

         
        builder.addCase(RegInfo.rejected, (state) => {
            state.isLoading = false;
        });


        builder.addCase( fetchDetails.pending, (state) => {
            state.isLoading = true;  
        });
        
        builder.addCase( fetchDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.status;  
            state.data2 = action.payload;
            console.log("fulfill is",action)
        });
        
        builder.addCase( fetchDetails.rejected, (state) => {
            state.isLoading = false;
        });
        
        builder.addCase(resetPassword.pending, (state) => {
            state.isLoading = true;  
          });
        
        builder.addCase(resetPassword.fulfilled, (state, action) => {
              state.isLoading = false;
              state.status = action.payload.status;  
              state.data = action.payload;
              console.log("fulfill is",action)
        });
        
        builder.addCase(resetPassword.rejected, (state) => {
              state.isLoading = false;       
        });

      },
})

export default authSlice.reducer;