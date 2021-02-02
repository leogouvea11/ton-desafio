export const createDbToPlainMapper = <T>(keysToMap: (keyof T)[]) => (obj: { [key: string]: any }): any => {
  if (!obj) {
    return obj
  }
  return keysToMap.reduce(
    (acc, key: any) => {
      if (obj[key] !== undefined && obj[key] !== null) {
        acc[key] = obj[key].toString()
      }
      return acc
    },
    { ...obj }
  )
}
