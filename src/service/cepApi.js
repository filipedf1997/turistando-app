async function getCep(cep) {
  const URL = 'https://viacep.com.br/ws/'
  const TYPE = '/json'

  try {
    const response = await fetch(URL + cep + TYPE)
    if (response.status !== 200) {
      throw new Error()
    }
    return response.json()
  } catch (error) {
    return false
  }
}

export default getCep
