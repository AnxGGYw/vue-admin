export const getCurrentAuthority = () => {
  return ['admin']
}

export const checkAuthority = authority => {
  if (!authority) return false
  const current = getCurrentAuthority()
  return current.some(item => authority.includes(item))
}

export const isLogined = () => {
  const current = getCurrentAuthority()
  return current && current[0] !== 'guest'
}
