import { Storage } from "@plasmohq/storage"
import { useEffect, useMemo, useState, useCallback } from "react"

import type { StorageCallbackMap } from "@plasmohq/storage"
import type { Dispatch, SetStateAction } from "react"

type SetDataDispatch<T> = Dispatch<SetStateAction<T | undefined>>

export type UseStorageReturnValues<T> =
  | {
      data: T | undefined
      setData: SetDataDispatch<T>
      loading: false
    }
  | {
      data: undefined
      setData: SetDataDispatch<T>
      loading: true
    }
export const useStorage = <T>(key: string): UseStorageReturnValues<T> => {
  const [data, setData] = useState<T | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const storage = useMemo(() => new Storage(), [])

  const setStorageData = useCallback<SetDataDispatch<T>>(
    (setStateAction) => {
      if (typeof setStateAction === "function") {
        const result = (
          setStateAction as (prevState: T | undefined) => T | undefined
        )(data)
        setData(result)
        storage.set(key, result)
      } else {
        setData(setStateAction)
        storage.set(key, setStateAction)
      }
    },
    [data, key, storage]
  )

  useEffect(() => {
    const callbackMap: StorageCallbackMap = {
      [key]: ({ newValue }) => {
        setData(newValue)
        setLoading(false)
      },
    }
    storage.watch(callbackMap)
    storage.get<T>(key).then((value) => {
      setData(value)
      setLoading(false)
    })
    return () => {
      storage.unwatch(callbackMap)
    }
  }, [key, storage])

  return loading
    ? {
        data: undefined,
        setData: setStorageData,
        loading,
      }
    : {
        data,
        setData: setStorageData,
        loading,
      }
}
