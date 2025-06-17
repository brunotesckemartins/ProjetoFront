import api from './api'

export const getGames = async () => {
  try {
    const response = await api.get('/games')
    return response.data
  } catch (error) {
    throw new Error('Falha ao carregar jogos')
  }
}

export const createGame = async (gameData) => {
  try {
    const response = await api.post('/games', gameData)
    return response.data
  } catch (error) {
    throw new Error('Falha ao criar jogo')
  }
}

export const updateGame = async (id, gameData) => {
  try {
    const response = await api.put(`/games/${id}`, gameData)
    return response.data
  } catch (error) {
    throw new Error('Falha ao atualizar jogo')
  }
}

export const deleteGame = async (id) => {
  try {
    await api.delete(`/games/${id}`)
  } catch (error) {
    throw new Error('Falha ao excluir jogo')
  }
}