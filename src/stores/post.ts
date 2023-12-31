import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { getAllPosts, getAPost, update } from '@/firebase/model'
import type PostType from '@/contracts/post.interface'
import {
  type QuerySnapshot,
  type QueryDocumentSnapshot,
  Timestamp,
  addDoc,
  collection as coll
} from 'firebase/firestore'
import { db } from '@/firebase'

export const usePostStore = defineStore('post', () => {
  const posts = ref<Array<PostType>>([])
  const postSnapshot = ref<QuerySnapshot>()

  const collection = 'post'

  const count = computed(() => (postSnapshot.value ? postSnapshot.value.size : 0))
  const empty = computed(() => (postSnapshot.value ? postSnapshot.value.empty : true))

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

    const result = await getAPost(uid)

    return result.data()
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

  return { posts, fetch, getOne, updatePost, createPost, count, empty }
})

/**
 * Map the query snapshot for posts array
 * @param x QueryDocumentSnapshot
 * @returns PostType
 */
const mapPost = (x: QueryDocumentSnapshot): PostType => {
  const data = x.data()

  return {
    id: x.id,
    title: data.title,
    slug: data.slug,
    category: data.category,
    excerpt: data.excerpt,
    content: data.content,
    status: data.status,
    published: data.published ? new Date(data.published.toDate()) : new Date('2021-02-01T00:00:00'),
    created: data.created.toDate(),
    modified: data.modified.toDate()
  }
}
