import { Permission } from "node-appwrite";
import { db, voteCollection } from "../name";
import { database } from "./config";
import { promiseHooks } from "v8";



export default async function createVoteCollection() {
     await database.createCollection(db,voteCollection,voteCollection,[
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])

    console.log("votes collection created");


    await Promise.all([
        database.createEnumAttribute(db,voteCollection,"type",["answer","question"],true),
        database.createEnumAttribute(db,voteCollection,"voteType",["upvoted","downvoted"],true),
        database.createStringAttribute(db,voteCollection,"typeId",50,true),
        database.createStringAttribute(db,voteCollection,"votedById",50,true),
    ])
}