const useHttp = () => {
  const request = async (
    url, 
    method = "GET", 
    body = null, 
    headers =  {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
   }) => {
      try {
        const response = await fetch(url, {method, body, headers});
        const data = await response.json();
        return data
      } catch (e) {
        throw new Error(`${e.message} ${url}`);
        }
    }

  return {request}
}

export default useHttp