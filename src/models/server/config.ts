import env from "@/env";

import { Client ,Account,Users,Storage,Databases } from "node-appwrite";

let client = new Client();

client
    .setEndpoint(env.appwrite.endpoints) 
    .setProject(env.appwrite.projectId) 
    .setKey(env.appwrite.apikey) ;

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);
const users = new Users(client);

export {client,account,database,users,storage};