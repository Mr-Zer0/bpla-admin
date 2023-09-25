import type CategoryType from '@/contracts/category.interface'
import type PostType from '@/contracts/post.interface'
import type { DocumentReference, QuerySnapshot } from 'firebase/firestore'

import { db } from '.'
import { Timestamp, addDoc, collection } from 'firebase/firestore'

/**
 * Create a new document
 * @param col string Collection name
 * @param payload Category Category information
 * @returns DocumentReference
 */
export const add = async (col: string, payload: CategoryType|PostType): Promise<DocumentReference> => {
  payload.created = Timestamp.now()
  payload.modified = Timestamp.now()

  const docRef = await addDoc(collection(db, col), payload)

  return docRef
}

export const getOne = async (col: string, uid: string) => {
  
}

export const getAll = async () => {

}

/****************
 * == CATEGORY ==
 ****************/

export const addCategory = async (payload: CategoryType) : Promise<DocumentReference> => {
  return await add('category', payload)
}

/************
 * == POST ==
 ************/

export const addPost = async (payload: PostType) : Promise<DocumentReference> => {
  return await add('post', payload)
}