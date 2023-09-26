import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { getAllPosts } from '@/firebase/model'
import type PostType from '@/contracts/post.interface'
import type { QuerySnapshot, QueryDocumentSnapshot } from 'firebase/firestore'

export const usePostStore = defineStore('post', () => {
  const posts = ref<Array<PostType>>([])
  const postSnapshot = ref<QuerySnapshot>()

  const count = computed(() => postSnapshot.value ? postSnapshot.value.size : 0)
  const empty = computed(() => postSnapshot.value ? postSnapshot.value.empty : true)

  /**
   * Fetch all posts from database
   * @param force boolean
   * @returns array
   */
  async function fetch(force = false) {
    if (! postSnapshot.value || force) {
      const querySnapshot = await getAllPosts()

      postSnapshot.value = querySnapshot
      posts.value = querySnapshot.docs.map(x => mapPost(x))
    }

    return posts.value
  }

  return   { posts, fetch, count, empty }
})

/**
 * Map the query snapshot for posts array
 * @param x QueryDocumentSnapshot
 * @returns PostType
 */
const mapPost = (x: QueryDocumentSnapshot) : PostType => {
  const data = x.data()

  return {
    id: x.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    status: data.status,
    published: data.published ? data.published.toDate() : new Date('2021-02-01T00:00:00'),
    created: data.created.toDate(),
    modified: data.modified.toDate()
  }
}