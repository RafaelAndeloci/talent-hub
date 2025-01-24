import bcrypt from 'bcrypt'
import { config } from '../../config/environment'

const hash = async (password: string) => {
  return await bcrypt.hash(password, config.security.passwordSalt)
}

const compare = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash)
}

export const hasher = {
  hash,
  compare,
}
