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

// Initialize account service
const account = new Account(client);
const databases = new Databases(client);

// 3️⃣ Signup function
export const signup = async ({ email, password, name }) => {
    try {
        const user = await account.create(
            "unique()", // Appwrite generates unique user ID
            email,
            password,
            name
        );
        return user;
    } catch (err) {
        throw err;
    }
};

// 4️⃣ Login function
export const login = async ({ email, password }) => {
    try {
        const session = await account.createEmailSession(email, password);
        // Get current user
        const user = await account.get();
        return { session, user };
    } catch (err) {
        throw err;
    }
};

// 5️⃣ Logout function
export const logout = async () => {
    try {
        await account.deleteSession("current");
    } catch (err) {
        throw err;
    }
};

// Function to update or create a document for search tracking
export const updateSearchCount = async (searchTerm, movie) => {
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
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`, // ✅ Use poster_path from TMDB
            });
        }
    } catch (error) {
        console.error('Appwrite Error:', error);
    }
};

export const getTrendingMovies = async () => {
    try {
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.limit(5), Query.orderDesc("count")])
        return result.documents;
    } catch (error) {
        console.log(error);
    }
}
