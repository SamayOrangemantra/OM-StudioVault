/*
 * Shared Framer Motion variants. Centralizing them keeps motion consistent
 * across the app (same easing, same distances) and makes the feel tunable from
 * one place. A MotionConfig with reducedMotion="user" (see App.jsx) means these
 * transforms automatically soften to opacity-only for users who ask for it.
 */

// A refined, slightly-overshooting ease for entrances. Exported so one-off
// motion (e.g. per-index grid delays) shares the exact same curve.
export const EASE = [0.22, 1, 0.36, 1]

/** Page / section entrance: fade up a touch. */
export const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
}

/** Grid / list item entrance: fade up with a hair of scale. */
export const gridItem = {
  hidden: { opacity: 0, y: 10, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: EASE } },
}

/** Container that staggers its children's entrance. */
export const staggerContainer = (staggerChildren = 0.05, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

/** Standard route-content cross-fade. */
export const routeTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.25, ease: EASE } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.15, ease: 'easeIn' } },
}

/** Spring pop — for menus, tooltips, modals. */
export const popIn = {
  hidden: { opacity: 0, scale: 0.92, y: -6 },
  show: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: 'spring', stiffness: 480, damping: 28 },
  },
  exit: {
    opacity: 0, scale: 0.92, y: -4,
    transition: { duration: 0.12, ease: 'easeIn' },
  },
}

/** Slide up from bottom — for drawers, action sheets. */
export const slideUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 380, damping: 28 },
  },
  exit: { opacity: 0, y: 16, transition: { duration: 0.15 } },
}

/** Scroll-triggered section reveal — use with whileInView. */
export const inView = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.4, ease: EASE },
  },
}
