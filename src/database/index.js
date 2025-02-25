import mongoose from 'mongoose';

import databaseConfig from '../config/database.js';

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = mongoose.connect(
      databaseConfig.url,
      databaseConfig.config
    );
  }
}

export default new Database();