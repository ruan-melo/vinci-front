import { getApiClient } from './getApiClient'

export const api = getApiClient()

export const fetcher = async (url: string) => {
  return await api.get(url).then((res) => res.data)
}
