import { Account, Avatars, Client, Storage, Databases } from "appwrite"


export const appwriteConfig = {
    storageId: import.meta.env.VITE_APPWRITE_PROJECT_STORAGE_ID,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    projectUrl: import.meta.env.VITE_APPWRITE_PROJECT_URL,
    databaseId: import.meta.env.VITE_APPWRITE_PROJECT_DATABASE_ID,
    postCollectionId: import.meta.env.VITE_APPWRITE_PROJECT_POST_COLLECTION_ID,
    userCollectionId: import.meta.env.VITE_APPWRITE_PROJECT_USER_COLLECTION_ID,
    savesCollectionId: import.meta.env.VITE_APPWRITE_PROJECT_SAVES_COLLECTION_ID,
}



export const client = new Client()

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.projectUrl);


export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)