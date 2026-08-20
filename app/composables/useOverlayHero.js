// Routes whose top section is a dark Hero the header should sit
// transparently over (white text/logo) until the page is scrolled.
// Every other route gets the floating white header from the start.
export const OVERLAY_HERO_ROUTES = ['/', '/about', '/services', '/contact', '/blog', '/book-consultation']

export function useHasOverlayHero () {
  const route = useRoute()

  return computed(() => OVERLAY_HERO_ROUTES.includes(route.path))
}
