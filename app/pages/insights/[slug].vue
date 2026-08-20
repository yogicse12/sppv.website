<template>
  <div>
    <article v-if="post">
      <!-- Header -->
      <section class="bg-white pb-10 pt-12 sm:pt-16">
        <div class="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <NuxtLink
            to="/insights"
            class="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to insights
          </NuxtLink>

          <span class="mt-6 inline-flex w-fit items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-600">
            {{ post.category }}
          </span>

          <h1 class="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            {{ post.title }}
          </h1>

          <div class="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-500">
            <span class="font-medium text-slate-700">SPPV Team</span>
            <span aria-hidden="true">&middot;</span>
            <span>{{ post.date }}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{{ post.readTime }}</span>
          </div>
        </div>
      </section>

      <!-- Feature image -->
      <section class="bg-white pb-12 sm:pb-16">
        <div class="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          <div class="aspect-[16/9] overflow-hidden rounded-4xl bg-slate-100">
            <img :src="post.image" :alt="post.title" class="h-full w-full object-cover">
          </div>
        </div>
      </section>

      <!-- Body -->
      <section class="bg-white pb-20 sm:pb-24 lg:pb-28">
        <div class="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
          <template v-for="(block, index) in post.body" :key="index">
            <h2
              v-if="block.type === 'h2'"
              class="mt-10 text-2xl font-bold tracking-tight text-slate-900 first:mt-0"
            >
              {{ block.text }}
            </h2>

            <p
              v-else-if="block.type === 'p'"
              class="mt-5 text-lg leading-relaxed text-slate-600 first:mt-0"
            >
              {{ block.text }}
            </p>

            <ul v-else-if="block.type === 'ul'" class="mt-5 flex flex-col gap-3">
              <li v-for="item in block.items" :key="item" class="flex gap-3 text-lg leading-relaxed text-slate-600">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-1.5 h-4 w-4 shrink-0 text-indigo-600" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{{ item }}</span>
              </li>
            </ul>
          </template>
        </div>
      </section>

      <!-- More from Insights -->
      <section v-if="relatedPosts.length" class="bg-[#ededfd] py-20 sm:py-24 lg:py-28">
        <div class="mx-auto max-w-8xl px-5 sm:px-6 lg:px-8">
          <h2 class="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            More from Insights
          </h2>

          <div class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <BlogPostCard
              v-for="related in relatedPosts"
              :key="related.slug"
              :title="related.title"
              :excerpt="related.excerpt"
              :image-src="related.image"
              :image-alt="related.title"
              :category="related.category"
              :date="related.date"
              :read-time="related.readTime"
              :to="`/insights/${related.slug}`"
            />
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="bg-slate-900">
        <div class="mx-auto max-w-8xl px-5 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Have a question about this?
          </h2>
          <p class="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            We're happy to talk through how this applies to your specific situation.
          </p>
          <NuxtLink
            to="/contact"
            class="mt-8 inline-flex items-center rounded-full bg-white px-7 py-3.5 text-[15px] font-medium text-slate-900 transition-colors hover:bg-indigo-50"
          >
            Contact us
          </NuxtLink>
        </div>
      </section>
    </article>

    <!-- Not found -->
    <section v-else class="bg-white py-32">
      <div class="mx-auto max-w-xl px-5 text-center sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-slate-900">Post not found</h1>
        <p class="mt-4 text-slate-500">
          We couldn't find the article you were looking for.
        </p>
        <NuxtLink
          to="/insights"
          class="mt-8 inline-flex items-center rounded-full bg-indigo-600 px-7 py-3.5 text-[15px] font-medium text-white transition-colors hover:bg-indigo-500"
        >
          Back to insights
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
const route = useRoute()

const post = computed(() => getBlogPostBySlug(route.params.slug))

const relatedPosts = computed(() => {
  if (!post.value) return []

  return BLOG_POSTS
    .filter((candidate) => candidate.slug !== post.value.slug && candidate.category === post.value.category)
    .concat(BLOG_POSTS.filter((candidate) => candidate.slug !== post.value.slug && candidate.category !== post.value.category))
    .slice(0, 3)
})

useHead(() => ({
  title: post.value ? post.value.title : 'Post not found',
  meta: [
    {
      name: 'description',
      content: post.value ? post.value.excerpt : 'This article could not be found.'
    }
  ]
}))
</script>
