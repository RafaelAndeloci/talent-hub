const hasher = {
  async hash(password: string) {
    return password;
  },
  async compare(password: string, hash: string) {
    return password === hash;
  },
}

export default hasher;