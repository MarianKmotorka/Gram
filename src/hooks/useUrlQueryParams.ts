import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

const useUrlQueryParams = () => {
  const { search } = useLocation()
  return queryString.parse(search)
}

export default useUrlQueryParams
