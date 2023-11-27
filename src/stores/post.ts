import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getAllPosts, update } from '@/firebase/model'
import type PostType from '@/contracts/post.interface'
import {
  type QuerySnapshot,
  Timestamp,
  addDoc,
  collection as coll,
  doc,
  getDoc,
  getDocs,
  DocumentSnapshot,
  query,
  where,
  orderBy
} from 'firebase/firestore'
import { db } from '@/firebase'
import { catcher } from '@/util'

export const usePostStore = defineStore('post', () => {
  const posts = ref<Array<PostType>>([])
  const postSnapshot = ref<QuerySnapshot>()

  const collection = 'post'
  const postRef = coll(db, 'post')

  const count = computed(() => (postSnapshot.value ? postSnapshot.value.size : 0))
  const empty = computed(() => (postSnapshot.value ? postSnapshot.value.empty : true))
  const hasCategory = (slug: string) => {
    if (posts.value) {
      const result = posts.value.find((x) => x.category.slug === slug)

      return result ? true : false
    }

    return false
  }

  const getByCategory = async (cat: string) => {
    let result

    if (hasCategory(cat)) {
      result = posts.value.filter((x) => x.category.slug === cat)
    }

    const q = query(postRef, where('category.slug', '==', cat), orderBy('created', 'desc'))

    try {
      const response = await getDocs(q)
      const mapped = response.docs.map((x) => mapPost(x))

      posts.value = posts.value ? posts.value.concat(mapped) : mapped
      result = mapped
    } catch (error) {
      catcher(error)
    }

    return result
  }

  /**
   * Fetch all posts from database
   * @param force boolean
   * @returns array
   */
  async function fetch(force = false) {
    if (!postSnapshot.value || force) {
      const querySnapshot = await getAllPosts()

      postSnapshot.value = querySnapshot
      posts.value = querySnapshot.docs.map((x) => mapPost(x))
    }

    return posts.value
  }

  const getOne = async (uid: string) => {
    if (posts.value.length > 0) {
      return posts.value.find((e) => e.id === uid)
    }

    try {
      const docRef = doc(db, collection, uid)
      const result = await getDoc(docRef)

      return mapPost(result)
    } catch (error) {
      catcher(error)
    }
  }

  const updatePost = async (uid: string, value: PostType) => {
    await update(collection, uid, value)

    if (posts.value.length > 0) {
      const index = posts.value.findIndex((e) => e.id! === uid)

      posts.value[index] = {
        ...posts.value[index],
        ...value
      }
    }
  }

  const createPost = async (payload: PostType) => {
    const customPayload = {
      title: payload.title,
      slug: payload.slug,
      category: payload.category,
      excerpt: payload.excerpt,
      content: payload.content,
      status: payload.status,
      published: payload.published ? Timestamp.fromDate(payload.published) : undefined,
      modified: Timestamp.now(),
      created: Timestamp.now()
    }

    await addDoc(coll(db, 'post'), customPayload)
  }

  return {
    posts,
    fetch,
    getOne,
    updatePost,
    createPost,
    getByCategory,
    count,
    empty
  }
})

/**
 * Map the query snapshot for posts array
 * @param x QueryDocumentSnapshot
 * @returns PostType
 */
// const mapPost = (x: QueryDocumentSnapshot): PostType => {
const mapPost = (x: DocumentSnapshot): PostType => {
  const data = x.data()

  return {
    id: x.id,
    title: data!.title,
    slug: data!.slug,
    category: data!.category,
    excerpt: data!.excerpt,
    content: data!.content,
    status: data!.status,
    published: data!.published
      ? new Date(data!.published.toDate())
      : new Date('2021-02-01T00:00:00'),
    created: data!.created.toDate(),
    modified: data!.modified.toDate()
  }
}
