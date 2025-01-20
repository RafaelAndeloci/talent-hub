import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const hasher = {
  async hash(password: string) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  },

  async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  },
};

export default hasher;
