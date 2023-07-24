import {useCallback} from "react"

import {useFetch} from "@/hooks/useFetch"

import {basePath} from "@/config"


export interface GetModelsRequestProps {
  key: string
}

const getApiUrl = (path: string) => {
  return `${basePath}${path}`
}

const useApiService = () => {
  const fetchService = useFetch()

  const getModels = useCallback(
    (params: GetModelsRequestProps, guestCode = "", signal?: AbortSignal) => {
      return fetchService.post<GetModelsRequestProps>(`${getApiUrl("/api/models")}`, {
        body: {key: params.key},
        headers: {
          "Content-Type": "application/json",
          ...(guestCode && {Authorization: `Bearer ${guestCode}`})
        },
        signal
      })
    },
    [fetchService]
  )

  return {
    getModels
  }
}

export default useApiService