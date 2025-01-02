import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../firebase/firebase";

export const uploadImages = async (files: File[]): Promise<string[]> => {
    const storage = getStorage(app);

    // Create an array of promises that upload each file
    const uploadPromises = files.map((file, index) => {
        const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
        const randomString = Math.random().toString(36).substring(2, 8);
        const fileName = `${timestamp}_${randomString}_${file.name}`;
        const fileRef = ref(storage, `upload/${fileName}`);

        return new Promise<{ index: number; url: string }>((resolve, reject) => {
            const uploadTask = uploadBytesResumable(fileRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // You can handle progress here if necessary
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Progress: ${progress}% for file ${file.name}`);
                },
                (err) => {
                    reject(err);
                },
                () => {
                    // Once the upload completes, get the URL
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((url) => resolve({ index, url }))
                        .catch((err) => reject(err));
                }
            );
        });
    });

    // Wait for all uploads to finish
    try {
        const uploadedUrlsWithIndex = await Promise.all(uploadPromises);

        // Sort the results by index to preserve the original order
        const sortedUrls = uploadedUrlsWithIndex
            .sort((a, b) => a.index - b.index) // Sort by the original index
            .map((item) => item.url); // Extract only the URLs

        return sortedUrls;
    } catch (error) {
        console.error("Error uploading images:", error);
        throw error;
    }
};
