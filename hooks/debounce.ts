import {useEffect, useState} from "react";

export const useDebounce = (searchValue: string): string => {
    const [debouncedValue, setDebouncedValue] = useState(searchValue)

    useEffect(() => {
        const timerId = setTimeout(() => {setDebouncedValue(searchValue)}, 500)
        return () => clearTimeout(timerId)
    }, [searchValue])

    return debouncedValue
}