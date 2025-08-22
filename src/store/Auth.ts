import { immer } from "zustand/middleware/immer";
import {create} from 'zustand'
import { persist } from "zustand/middleware";
import { AppwriteException,ID,Models } from "node-appwrite";
import { account } from "@/models/client/config";
import { Mode } from "fs";


export interface UserPrefs{
    reputation:number
} 

interface iAuthStore{
    session:Models.Session | null
    jwt:string | null
    user:Models.User<UserPrefs> | null
    hydrated:boolean

    setHydrated():void;
    verifySession():Promise<void>;
    login(email:string,password:string):
    Promise<{
        success:boolean;
        error: AppwriteException | null
    }>

    createAccount(email:string,password:string,name:string):
    Promise<{
        success:boolean;
        error:AppwriteException |null
    }>

    logout():Promise<void>
}


export const userAuthStore=create<iAuthStore>()(
    persist(
    immer((set) => ({
      session: null,
      jwt: null,
      user: null,
      hydrated: false,

      setHydrated: () => {
        set({hydrated:true})
      },

      verifySession: async () => {
        try {
            const session=await account.getSession("current")
            set({session})
            
        } catch (error) {
            console.log(error);
            
        }
      },

      login: async (email:string, password:string) => {
       try {
         const session=await account.createEmailPasswordSession(email, password);
         const [user,{jwt}]=await Promise.all([
          account.get<UserPrefs>(),
          account.createJWT()
         ])

         if (!user.prefs?.reputation) {
          await account.updatePrefs<UserPrefs>({reputation:0})
         }

         set({session,user,jwt});
         return { success: true, error: null };
       } catch (error) {
        console.log(error);
        return { success: false, error:error instanceof AppwriteException ? error : null };
       }
      },

      createAccount: async (email:string, password:string, name:string) => {
        try {

          await account.create(ID.unique(),email,password,name);
          return { success: true, error: null };

        } catch (error) {
          console.log(error);
          return { success: false, error:error instanceof AppwriteException ? error : null };
        }
      },

      logout: async () => {
        try {
          await account.deleteSessions();
          set({session:null,jwt:null,user:null})
        } catch (error) {
          console.log("logot failed",error);
          
        }
      },
    })),
    {
        name:"auth",
        onRehydrateStorage(){
            return (state,error)=>{
                if (!error) state?.setHydrated()
            }
        }
    }
    )

)