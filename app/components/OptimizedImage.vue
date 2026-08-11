<template>
    <div>
        <div class="image-wrapper" :style="{ aspectRatio }">
            <NuxtImg
                :src="src"
                :alt="alt"
                :width="width"
                :height="height"
                :sizes="sizes"
                :class="className"
                class="image-element"
                :loading="loading"
                :preload="preload"
                @load="onImageLoad"
                @error="onImageError"
            />
            <div v-if="isLoading" class="image-skeleton" />
        </div>
    </div>
</template>

<script setup>
defineProps({
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    },
    width: {
        type: Number,
        default: 800
    },
    height: {
        type: Number,
        default: 600
    },
    sizes: {
        type: String,
        default: '100vw'
    },
    className: {
        type: String,
        default: ''
    },
    loading: {
        type: String,
        default: 'lazy'
    },
    preload: {
        type: Boolean,
        default: false
    },
    aspectRatio: {
        type: String,
        default: '16/9'
    },
    placeholder: {
        type: String,
        default: 'blur'
    }
});

const isLoading = ref(true);

const onImageLoad = () => {
    isLoading.value = false;
};

const onImageError = () => {
    isLoading.value = false;
};
</script>

<style lang="scss" scoped>
.image-wrapper {
  position: relative;
  overflow: hidden;
  background-color: $bg-tertiary;
  border-radius: $radius-lg;
}

.image-element {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.image-skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    $bg-tertiary 0%,
    lighten($bg-tertiary, 5%) 50%,
    $bg-tertiary 100%
  );
  background-size: 200% 100%;
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>