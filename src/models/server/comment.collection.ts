import { Permission } from "node-appwrite";
import { db,commentCollection } from "../name";
import { database } from "./config";


export  default async function createCommentCollection() {
    await database.createCollection(db,commentCollection,commentCollection,[
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])

    console.log("comment collection created");

    await Promise.all([
         database.createStringAttribute(db,commentCollection,'content',10000,true),
         database.createEnumAttribute(db,commentCollection,'type',["answer","question"],true),
         database.createStringAttribute(db,commentCollection,'typeId',50,true),
         database.createStringAttribute(db,commentCollection,'authorId',50,true)
    ])

    console.log("comment collection attributes created");
    
}