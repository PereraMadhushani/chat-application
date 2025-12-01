import {create} from 'zustand';
import {axiosInstance} from '../lib/axios';
import {toast} from 'react-hot-toast';

export const useAuthStore = create((set) => ({
   authUser: null,
isCheckingAuth: true,
isSignUp: false,
isLogging:false,

checkAuth: async () => {
    try{
        const res = await axiosInstance.get('/auth/check');
        set({authUser:res.data});
    } catch (error) {
        console.log("Error in authCheck", error);
        set({authUser:null});
    } finally {
        set({isCheckingAuth:false});
    }
},

signup: async(data)=>{
    set({isSignUp:true});
    try{
        const res = await axiosInstance.post('/auth/signup',data);
        set({authUser:res.data});

        toast.success("Account created successfully!");

    }catch(error){
        toast.error(error.response?.data?.message || "Signup failed");
        console.log("Error in signup", error);
    }finally{
        set({isSignUp:false});
    }
},

login: async(data)=>{
    set({isLogging:true});
    try{
        const res = await axiosInstance.post('/auth/login',data);
        set({authUser:res.data});

        toast.success("Login successfully!");

    }catch(error){
        toast.error(error.response?.data?.message || "Login failed");
        console.log("Error in login", error);
    }finally{
        set({isLogging:false});
    }
},

logout: async()=>{
    try{
        await axiosInstance.post('/auth/logout');
        set({authUser:null});
        toast.success("Logged out successfully!");

    }catch(error){
        toast.error(error.response?.data?.message || "Logout failed");
        console.log("Error in logout", error);
    }
}


}));