<template>
    <div>
        <HeroImageCarousel
            :images="images"
            :autoplay="true"
            :autoplay-interval="5000"
            :enable-keyboard="true"
            :loop="true"
        />
    </div>
</template>

<script setup>
const images = [
    {
        src: '/images/image-1.jpg',
        alt: 'First image',
        caption: 'First Image',
        description: 'Description for the first image.'
    },
    {
        src: '/images/image-2.jpg',
        alt: 'Second image',
        caption: 'Second Image',
        description: 'Description for the second image.'
    },
]
</script>

<style lang="scss" scoped>

</style>