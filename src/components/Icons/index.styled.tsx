export const loadingProgressVariants = {
  animate: {
    x: [-4, 4],
    y: [5, -10],
    rotateZ: [-10, 10],
    transition: {
      x: { yoyo: Infinity, duration: 0.4 },
      y: { yoyo: Infinity, duration: 0.2 },
      rotateZ: { yoyo: Infinity, duration: 0.4 },
    },
  },
}
