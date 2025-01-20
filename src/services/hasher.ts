import bcrypt from 'bcrypt';

const saltRound = 10;

const hasher = {
  async hash(password: string) {
    const salt = await bcrypt.genSalt(saltRound);
    return await bcrypt.hash(password, salt);
  },

  async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  },
};

export default hasher;
