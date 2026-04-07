import { Client, Databases, ID, Query, Account } from 'appwrite';

// Environment variables
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';

// Initialize Appwrite client
const client = new Client();
client
    .setEndpoint(ENDPOINT)
    .setProject(PROJECT_ID);

// Initialize services
export const account = new Account(client);
export const databases = new Databases(client);

export const signup = async ({ email, password, name }) => {
    try {
        const user = await account.create(
            ID.unique(),
            email,
            password,
            name
        );
        return user;
    } catch (err) {
        // Log it for the dev (you)
        console.error("Signup Service Error:", err.message);
        // Throw it so the UI (Signup.jsx) can see it
        throw err;
    }
};

// 2️⃣ Login function
export const login = async ({ email, password }) => {
    try {
        // Updated from createEmailSession to createEmailPasswordSession (Appwrite 14+)
        const session = await account.createEmailPasswordSession(email, password);
        const user = await account.get();
        return { session, user };
    } catch (err) {
        console.error("Login Error:", err.message);
        throw err;
    }
};

// 3️⃣ Get Current User (Helper for App persistence)
export const getCurrentUser = async () => {
    try {
        return await account.get();
    } catch (err) {
        return null; // Return null if no active session exists
    }
};

// 4️⃣ Logout function
export const logout = async () => {
    try {
        await account.deleteSession("current");
        localStorage.removeItem("user"); // Clean up local storage as well
    } catch (err) {
        console.error("Logout Error:", err.message);
        throw err;
    }
};

// 5️⃣ Search Tracking
export const updateSearchCount = async (searchTerm, movie) => {
    if (!searchTerm || !movie) return;

    try {
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm),
        ]);

        if (result.documents.length > 0) {
            const doc = result.documents[0];
            await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1,
            });
        } else {
            await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                movie_id: movie.id,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            });
        }
    } catch (error) {
        console.error('Appwrite Database Error:', error);
    }
};

// 6️⃣ Trending Movies
export const getTrendingMovies = async () => {
    try {
        const result = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.limit(5), Query.orderDesc("count")]
        );
        return result.documents;
    } catch (error) {
        console.error("Fetch Trending Error:", error);
        return [];
    }
};