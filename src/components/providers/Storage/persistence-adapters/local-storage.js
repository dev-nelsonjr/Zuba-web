const STORAGE_KEY = '@zuba'

export const getItem = async () => {
  try {
    const data = await Promise.resolve(window.localStorage.getItem(STORAGE_KEY))
    return data && JSON.parse(data)
  } catch (error) {
    return Promise.reject(error)
  }
}

export const setItem = async data => {
  try {
    const result = await Promise.resolve(
      window.localStorage.setItem(STORAGE_KEY, data && JSON.stringify(data))
    )
    return result
  } catch (error) {
    return Promise.reject(error)
  }
}

export const clear = () => window.localStorage.clear()
