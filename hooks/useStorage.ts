import { useEffect, useState, useCallback } from "react"

import { SETTINGS_STORAGE } from "~constants"

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

  const setStorageData = useCallback<SetDataDispatch<T>>(
    (setStateAction) => {
      if (typeof setStateAction === "function") {
        const result = (
          setStateAction as (prevState: T | undefined) => T | undefined
        )(data)
        setData(result)
        SETTINGS_STORAGE.set(key, result)
      } else {
        setData(setStateAction)
        SETTINGS_STORAGE.set(key, setStateAction)
      }
    },
    [data, key]
  )

  useEffect(() => {
    const callbackMap: StorageCallbackMap = {
      [key]: ({ newValue }) => {
        setData(newValue)
        setLoading(false)
      },
    }
    SETTINGS_STORAGE.watch(callbackMap)
    SETTINGS_STORAGE.get<T>(key).then((value) => {
      setData(value)
      setLoading(false)
    })
    return () => {
      SETTINGS_STORAGE.unwatch(callbackMap)
    }
  }, [key])

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
