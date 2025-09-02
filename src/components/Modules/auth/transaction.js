export const getTransactions = async ({ token } = {}) => {
  try {
    if (!token) throw new Error('No authentication token provided')

    const response = await fetch('http://localhost:9900/transactions', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) throw new Error(`API error status: ${response.status}`)

    return await response.json()
  } catch (error) {
    console.error('Error fetching transactions from backend:', error)
    return Promise.reject(error)
  }
}
