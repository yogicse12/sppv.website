<template>
  <div>
    <Hero
      title="Insights on tax, accounting, and running a business"
      subtitle="Practical notes and updates from the SPPV team — for when you want more than just compliance."
      :primary-cta="null"
      :secondary-cta="null"
    />

    <!-- Featured post -->
    <section class="bg-white py-16 sm:py-20 lg:py-24">
      <div class="mx-auto max-w-8xl px-5 sm:px-6 lg:px-8">
        <FeaturedBlogPostCard
          :title="featured.title"
          :excerpt="featured.excerpt"
          :image-src="featured.image"
          :image-alt="featured.title"
          :category="featured.category"
          :date="featured.date"
          :read-time="featured.readTime"
          :to="`/blog/${featured.slug}`"
        />
      </div>
    </section>

    <!-- All posts -->
    <section class="bg-white pb-20 sm:pb-24 lg:pb-28">
      <div class="mx-auto max-w-8xl px-5 sm:px-6 lg:px-8">
        <div class="flex flex-wrap gap-2" role="tablist" aria-label="Filter posts by category">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            role="tab"
            :aria-selected="activeCategory === category"
            class="rounded-full px-4 py-2 text-[14px] font-medium transition-colors"
            :class="activeCategory === category
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>

        <div v-if="filteredPosts.length" class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <BlogPostCard
            v-for="post in filteredPosts"
            :key="post.slug"
            :title="post.title"
            :excerpt="post.excerpt"
            :image-src="post.image"
            :image-alt="post.title"
            :category="post.category"
            :date="post.date"
            :read-time="post.readTime"
            :to="`/blog/${post.slug}`"
          />
        </div>

        <p v-else class="mt-16 text-center text-slate-500">
          No posts in this category yet.
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Blog',
  meta: [
    {
      name: 'description',
      content: 'Insights, updates and practical notes on tax, accounting, audit and advisory from SPPV & Co LLP.'
    }
  ]
})

const posts = BLOG_POSTS

const categories = ['All', 'Tax', 'Accounting', 'Audit', 'Advisory']
const activeCategory = ref('All')

const featured = posts[0]
const remainingPosts = posts.slice(1)

const filteredPosts = computed(() => {
  if (activeCategory.value === 'All') return remainingPosts

  return remainingPosts.filter((post) => post.category === activeCategory.value)
})
</script>
