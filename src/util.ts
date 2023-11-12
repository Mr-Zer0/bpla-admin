export const randomString = (len = 8, includeNumber = false) => {
  let characters = 'ABCDEFGHIJKLMNOPQURSTUVWXYZabcdefghijklmnopqrstuvwxyz'

  if (includeNumber) {
    characters = characters + '0123456789'
  }

  const charLen = characters.length

  let result = ''

  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * charLen))
  }

  return result
}
