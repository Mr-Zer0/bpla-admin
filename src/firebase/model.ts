import type CategoryType from '@/contracts/category.interface'
import type PostType from '@/contracts/post.interface'
import type GalleryType from '@/contracts/gallery.interface'
import type { DocumentData, DocumentReference, QuerySnapshot } from 'firebase/firestore'

import { db } from '.'
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  setDoc
} from 'firebase/firestore'

/**
 * Create a new document
 * @param col string Collection name
 * @param payload Category Category information
 * @returns DocumentReference
 */
export const add = async (
  col: string,
  payload: CategoryType | PostType | GalleryType
): Promise<DocumentReference> => {
  payload.created = Timestamp.now()
  payload.modified = Timestamp.now()

  const docRef = await addDoc(collection(db, col), payload)

  return docRef
}

export const update = async (
  col: string,
  uid: string,
  payload: CategoryType | PostType | GalleryType
): Promise<void> => {
  payload.modified = Timestamp.now()

  await setDoc(doc(db, col, uid), payload, { merge: true })
}

export const getOne = async (col: string, uid: string): Promise<DocumentData> => {
  const docRef = doc(db, col, uid)

  return await getDoc(docRef)
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

/****************
 * == CATEGORY ==
 ****************/

export const addCategory = async (payload: CategoryType): Promise<DocumentReference> => {
  return await add('category', payload)
}

export const getAllCategories = async (): Promise<QuerySnapshot> => {
  return await getAll('category')
}

export const getACategory = async (id: string): Promise<DocumentData> => {
  return await getOne('category', id)
}

export const deleteACategory = async (id: string): Promise<void> => {
  return await deleteDoc(doc(db, 'category', id))
}

export const updateACategory = async (id: string, payload: CategoryType): Promise<void> => {
  await update('category', id, payload)
}

/************
 * == POST ==
 ************/

export const addPost = async (payload: PostType): Promise<DocumentReference> => {
  return await add('post', payload)
}

export const getAllPosts = async (): Promise<QuerySnapshot> => {
  return await getAll('post')
}

export const getAPost = async (id: string): Promise<DocumentData> => {
  return await getOne('post', id)
}

export const deleteAPost = async (id: string): Promise<void> => {
  return await deleteDoc(doc(db, 'post', id))
}
