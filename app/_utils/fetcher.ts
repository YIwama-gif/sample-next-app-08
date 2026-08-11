export const fetcher = async (url: string) => {
  const res = await fetch(url)

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.status)
  }

  return await res.json()
}

export const fetcherWithToken = async (url: string, token: string) => {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
  })

  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.status)
  }

  return await res.json()
}
