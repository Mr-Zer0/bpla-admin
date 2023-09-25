import { addDoc, collection, Timestamp, getDocs } from "firebase/firestore"
import { db } from "."
import type Category from '@/contracts/category.interface'
import type Post from '@/contracts/post.interface'
import type { DocumentReference, QuerySnapshot } from "firebase/firestore"

/**
 * Create a new document
 * @param col string Collection name
 * @param payload Category Category information
 * @returns DocumentReference
 */
export const add = async (col: string, payload: Category): Promise<DocumentReference> => {
  payload.created = Timestamp.now()
  payload.modified = Timestamp.now()

  const docRef = await addDoc(collection(db, col), payload)

  return docRef
}

/**
 * Get all documents for the specific collection
 * @param col string Collection name
 * @returns QuerySnapshot
 */
export const getAll = async (col: string): Promise<QuerySnapshot> => {
  const querySnapshot = await getDocs(collection(db, col))

  return querySnapshot
}

export const addPost = async (col:string, payload: Post): Promise<DocumentReference> => {
  payload.created = Timestamp.now()
  payload.modified = Timestamp.now()

  const docRef = await addDoc(collection(db, col), payload)

  return docRef
}