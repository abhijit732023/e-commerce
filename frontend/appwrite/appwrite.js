import conf from '../config/config.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    // const client = new Client();
    // client
    //     .setEndpoint('https://fra.cloud.appwrite.io/v1')
    //     .setProject('681126fa000eb64a1802');

    async createPost({title, slug, content, featuredimage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredimage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,

                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId, 
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    async deleteMultipleFiles(fileIds = []) {
        const results = [];
    
        for (const fileId of fileIds) {
            const success = await this.deleteFile(fileId);
            results.push({ fileId, success });
        }
    
        return results; // You can log or analyze this if needed
    }
    

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    getFileViewUrl(fileId) {
        return this.bucket.getFileView(conf.appwriteBucketId, fileId);
      }

      
    async createprofiledocument({profileid,userid}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfilecCollectionID,
                ID.unique(),
                {profileid,
                    userid
                    
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createprofiledocument :: error", error);
        }
    }
    async uploadprofile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteProfilecBuketID, 
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadprofile :: error", error);
            return false
        }
    }
 
    getProfileFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteProfilecBuketID,
            fileId
        )
    }
    async getprofilepicture(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteProfilecCollectionID,
                
                

            )
        } catch (error) {
            console.log("Appwrite serive ::  :: error", error);
            return false
        }
    }
    async updateProfilePicture(slug,{profileid,userid}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProfilecCollectionID,
                slug,
                {
                    profileid,
                    userid
                }
                
            )
        } catch (error) {
            console.log("Appwrite serive :: profilepic :: error", error);
        }
    }
    
    async commentDocument({userid,comment,postid,username}){
        try {
            await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCommentCollectionID,ID.unique(),{userid,comment,postid,username})
            
        } catch (error) {
            console.log('Appwrite::commentDocument::error:',error);
            
        }
    }
    async getcomments(){
        try {
           return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCommentCollectionID)
        } catch (error) {
            console.log("Appwrite::getcomments::error:",error);
            
        }
    }
    async deleteprofilepicture(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteProfilecBuketID,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteprofilepicture :: error", error);
            return false
        }
    }
    async deleteComment(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCommentCollectionID,
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }



}


const AppwriteService = new Service()
export default AppwriteService