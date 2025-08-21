import { Permission } from "node-appwrite";
import { db,answerCollection } from "../name";
import { database } from "./config";


export default async function createAnswerCollection() {
    await database.createCollection(db,answerCollection,answerCollection,[
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])

    console.log("answer collection created");

    await Promise.all([
        await database.createStringAttribute(db,answerCollection,'content',10000,true),
        await database.createStringAttribute(db,answerCollection,'questionId',10000,true),
        await database.createStringAttribute(db,answerCollection,'authorId',10000,true)
    ])

    console.log("answer collection attributes created");
    
}