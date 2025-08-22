import { answerCollection, db } from "@/models/name";
import { database, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import {UserPrefs} from "@/store/Auth"
import next from "next";



export async function POST(request: NextResponse) {
    try {
        const {questionId,answer,authorId}=await request.json()

        if (!answer) {
            return NextResponse.json(
            {
                error:"Answer is required"
            },
            {
                status:400
            }
        )
        }
        const response=await database.createDocument(db,answerCollection,ID.unique(),{
            content:answer,
            authorId:authorId,
            questionId:questionId
        })

        const prefs=await users.getPrefs<UserPrefs>(authorId)
        await users.updatePrefs(authorId,
            {
                reputation:Number(prefs.reputation)+1
            }
        )
        return NextResponse.json(response,
            {
                status:200
            }
        )

    } catch (error:any) {
        return NextResponse.json(
            {
                error:error?.message || "Error whioe creating the answer"
            },
            {
                status:error?.code || error?.status || 500
            }
        )
    }
}


export async function DELETE(request:NextResponse) {
    try {
       const {answerId}=await request.json()
       const answer=await database.getDocument(db,answerCollection,answerId)
       const response=await database.deleteDocument(db,answerCollection,answerId)

        const prefs=await users.getPrefs<UserPrefs>(answer.authorId)
        await users.updatePrefs(answer.authorId,
            {
                reputation:Number(prefs.reputation)-1
            }
        )
        return NextResponse.json(
            {
                data:response
            },
            {
                status:200
            }
        )
        
    } catch (error:any) {
        return NextResponse.json(
            {
                error:error?.message || "Error while deleting the answers"
            },
            {
                status:error?.code || error?.status || 500
            }
        )
    }
}