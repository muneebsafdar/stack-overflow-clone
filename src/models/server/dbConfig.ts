import { db } from "../name";

import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

import { database } from "./config";


export default async function getOrCeateDb() {
    try {
        await database.get(db);
        console.log("db exists");
    } catch (error) {
        try {
            await database.create(db,db);
            console.log("db created");
            Promise.all([
                createAnswerCollection(),
                createCommentCollection(),
                createQuestionCollection(),
                createVoteCollection(),
            ])
        } catch (error) {
            console.error("db creation failed",error);
        }
    }

    return database
}