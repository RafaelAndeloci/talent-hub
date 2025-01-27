import bcrypt from 'bcrypt'
import { config } from '../../config/environment'

const hash = async (password: string) => {
  return await bcrypt.hash(password, config.security.password.hashSalt)
}

const compare = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash)
}

const genRandomToken = () =>
  bcrypt.hash(
    Math.random().toString(36).substring(7),
    config.security.password.hashSalt!,
  )

export const hasher = {
  hash,
  compare,
  genRandomToken,
}
