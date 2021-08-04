import db from "../../config/firebase";

export async function getQuery(collections: string[], docId: string) {
    const resRef = await db
        .collection(collections[0])
        .doc(docId)
        .collection(collections[1]);

    const result = await resRef
        .get()
        .then((snapshot) => {
            return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        })
        .catch((err) => console.error(err));
    return result;
}
