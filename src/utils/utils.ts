export const lightenColor = (color: string, opacity: number) => {
  if (color[0] === '#') color = color.slice(1)

  var bigint = parseInt(color, 16)
  var r = (bigint >> 16) & 255
  var g = (bigint >> 8) & 255
  var b = bigint & 255

  return `rgba(${r},${g},${b},${opacity})`
}

export const propertyOf = <T extends object>(name: keyof T) => name
