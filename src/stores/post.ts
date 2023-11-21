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

  const messages = ref<Array<PostType>>()
  const news = ref<Array<PostType>>()
  const policies = ref<Array<PostType>>()

  const collection = 'post'
  const postRef = coll(db, 'post')

  const count = computed(() => (postSnapshot.value ? postSnapshot.value.size : 0))
  const empty = computed(() => (postSnapshot.value ? postSnapshot.value.empty : true))

  const fetchPost = async (cat: string, state: any) => {
    const q = query(postRef, where('category.slug', '==', cat), orderBy('created', 'desc'))

    try {
      const result = await getDocs(q)
      const mapped = result.docs.map((x) => mapPost(x))
      posts.value = posts.value ? posts.value.concat(mapped) : mapped
      state.value = mapped
    } catch (error) {
      catcher(error)
    }
  }

  const getByCategory = async (cat: string) => {
    switch (cat) {
      case 'news':
        return await getNews()
        break

      case 'message':
        return await getMessages()
        break

      case 'policy':
        return await getPolicies()
        break

      default:
        throw new Error("The category name should not be other than 'news', 'message', 'policy'.")
        break
    }
  }

  const getMessages = async () => {
    if (!messages.value) {
      await fetchPost('message', messages)
    }

    return messages.value
  }

  const getNews = async () => {
    if (!news.value) {
      await fetchPost('news', news)
    }

    return news.value
  }

  const getPolicies = async () => {
    if (!policies.value) {
      await fetchPost('policy', policies)
    }

    return policies.value
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
    getMessages,
    getNews,
    getPolicies,
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
