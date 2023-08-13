<template>
  <main class="mx-auto my-8 max-w-7xl px-2 sm:px-6 lg:px-8">
    <BreadcrumbBar />

    <section class="bg-white mt-8 rounded-lg border border-solid border-slate-200">
      <section>
        <article
          v-for="(post, i) in posts" 
          :key="i"
          :class="[i === posts.length - 1 ? '' : 'border-b border-solid border-slate-200', 'px-5 py-3']"
        >
          <div>
            <h3 v-text="post.title" class="text-lg" />
            <div class="flex flex-row items-center gap-3 text-slate-500 mt-5 font-light">
              <CalendarIcon class="w-4 h-4" />
              <time datetime="{{ post.published_at }}" class="text-sm">
                {{ post.published_at }}
              </time>

              <TagIcon class="w-4 h-4 ml-4" />
              <p v-text="post.category" class="text-sm" />
            </div>
          </div>
        </article>
      </section>
    </section>
  </main>
</template>

<script lang="ts">
import { CalendarIcon, TagIcon } from '@heroicons/vue/24/outline'

export default {
  components: {
    CalendarIcon,
    TagIcon
  },
  data() {
    return {
      posts: [
        {
          title: 'ပြည်သူများသို့ အသိပေး ထုတ်ပြန်ခြင်း (၀၁/၂၀၂၂)',
          slug: 'statement-to-people-01-2022',
          published_at: '1 July 2022 7:30 PM',
          category: 'Statements'
        },
        {
          title: 'BPLA တာဝန်ခံ မောင်ဆောင်းခနှင့် ဆက်သွယ်မေးမြန်ချက် (Myanmar Now)',
          slug: 'statement-to-people-01-2022',
          published_at: '1 July 2022 7:30 PM',
          category: 'Statements'
        },
        {
          title: 'ဗမာပြည်သူ့လွတ်မြောက်ရေးတပ်တော် (Burma People\'s Libration Army - BPLA) ၏ တစ်နှစ်ပြည့် တပ်တော်နေ့အခမ်းအနားသို့ ညီနောင်မဟာမိတ် (၃) ဖွဲ့မှ ပေးပို့သော ဂုဏ်ပြုသဝဏ်လွှာ',
          slug: 'statement-to-people-01-2022',
          published_at: '1 July 2022 7:30 PM',
          category: 'Statements'
        },
        {
          title: 'ပြည်သူများသို့ အသိပေး ထုတ်ပြန်ခြင်း (၀၁/၂၀၂၂)',
          slug: 'statement-to-people-01-2022',
          published_at: '1 July 2022 7:30 PM',
          category: 'Statements'
        },
        {
          title: 'ပြည်သူများသို့ အသိပေး ထုတ်ပြန်ခြင်း (၀၁/၂၀၂၂)',
          slug: 'statement-to-people-01-2022',
          published_at: '1 July 2022 7:30 PM',
          category: 'Statements'
        }
      ]
    }
  }
}
</script>