import bcrypt from 'bcrypt'

export const hashCode = (code: string): string => {
  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashed = bcrypt.hashSync(code, salt)
  return hashed
}

export const checkHashCode = (code: string, hashCode: string): boolean => {
  const matched = bcrypt.compareSync(code, hashCode)
  return matched
}
