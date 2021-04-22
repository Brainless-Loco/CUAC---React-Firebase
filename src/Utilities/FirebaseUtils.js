import { firestore } from "../Firebase";

//                              collection_name: string
export const getCollection = async (collection_name) => {
    const collection = firestore.collection(collection_name);
    const data = await collection.get();

    const items = [];

    data.docs.forEach(item => {
        items.push(item.data());
    })

    return items;
}