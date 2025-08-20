import env from "@/env";
import { Client, Account,Avatars,Databases,Storage } from "appwrite";

const client = new Client()
    .setEndpoint(env.appwrite.endpoints) // Your API Endpoint
    .setProject(env.appwrite.projectId); // Your project ID

const account = new Account(client);
const database = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

export {client,account,database,avatars,storage};


