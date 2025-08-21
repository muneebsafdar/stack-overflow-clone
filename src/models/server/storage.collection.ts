import { Permission } from "node-appwrite";
import { questionAttachmentBucket } from "../name";
import { storage } from "./config";


export default async function createStorageCollection() {

    try {
        await storage.getBucket(questionAttachmentBucket);
        console.log("bucket exists");
    } catch (error) {
        try {
            storage.createBucket(questionAttachmentBucket,questionAttachmentBucket,[
                Permission.read("any"),
                Permission.read("users"),
                Permission.create("users"),
                Permission.update("users"),
                Permission.delete("users"),
            ],
            false,
            undefined,
            undefined,
            ["jpg","png","gif","jpeg","svg","webp","heic"]
        )
        console.log("bucket created");
        console.log("bucket connected");
        } catch (error) {
            console.error("bucket creation failed",error);
        }
    }
}

