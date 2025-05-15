const ENV_File = {
    backendURL: String(import.meta.env.VITE_BACKEND_URL),
    razor_secret_key: String(import.meta.env.VITE_KEY_SECRET),
    razor_key_id: String(import.meta.env.VITE_KEY_ID),
    email_config:String(import.meta.env.VITE_EMAIL_USER_ID),
    email_password:String(import.meta.env.VITE_EMAIL_PASSWORD),
    appwriteUrl:String(import.meta.env.VITE_API_URL),
    appwriteProjectId:String(import.meta.env.VITE_API_PROJECT_ID),
    appwriteCollectionId:String(import.meta.env.VITE_API_COLLECTION_ID),
    appwriteDatabaseId:String(import.meta.env.VITE_API_DATABASE_ID),
    appwriteBucketId:String(import.meta.env.VITE_API_BUCKET_ID),

};
// console.log(ENV_File); // Debugging: Check if variables are loaded
export default ENV_File;