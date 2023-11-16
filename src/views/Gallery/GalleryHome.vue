<template>
  <Layout>
    <section class="flex justify-between items-center">
      <h3 class="text-3xl font-semibold">Galleries</h3>

      <router-link
        to="/gallery/create"
        class="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Create
      </router-link>
    </section>

    <section class="bg-white mt-5 rounded-lg border border-solid border-slate-200">
      <div
        v-for="(gallery, i) in galleries"
        :key="gallery.id"
        :class="[
          i === galleries.length - 1 ? '' : 'border-b border-solid border-slate-200',
          'px-5 py-3 flex justify-between'
        ]"
      >
        <div class="flex items-center gap-x-2.5">
          <h3 v-text="gallery.title" class="text-lg" />
          <p
            :class="[
              gallery.status === 'drafted' ? 'text-slate-400' : 'text-green-600',
              'text-xs uppercase font-semibold mt-1'
            ]"
            v-text="gallery.status"
          />
        </div>

        <div class="flex flex-wrap md:flex-nowrap items-start gap-2">
          <router-link :to="'/gallery/edit/' + gallery.id">
            <PencilSquareIcon class="w-5 text-slate-500 hover:text-slate-700" />
          </router-link>
          <a href=""> </a>
          <button @click="remove(gallery)">
            <TrashIcon class="w-5 h-5 text-slate-500 hover:text-slate-700" />
          </button>
        </div>
      </div>
    </section>
  </Layout>
</template>

<script setup lang="ts">
import type GalleryType from '@/contracts/gallery.interface'
import { useGalleryStore } from '@/stores/gallery'
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'
import { onMounted } from 'vue'
import { ref } from 'vue'
import Layout from '@/components/Layouts/DefaultLayout.vue'

const galleryStore = useGalleryStore()

const galleries = ref<Array<GalleryType>>([])

onMounted(async () => {
  galleries.value = await galleryStore.fetch()
})

const remove = async (gallery: GalleryType) => {
  const confirmation = confirm(
    `Are you sure you want to delete the category! \n "${gallery.title}"`
  )

  if (confirmation) {
    if (gallery.id) {
      await galleryStore.remove(gallery.id)
    }
  }
}
</script>
