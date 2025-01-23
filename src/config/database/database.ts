import { DataTypes, Sequelize } from 'sequelize'
import { logger } from '../../shared/services/logging-service'
import { config } from '../environment'
import { formatSql } from '../../shared/utils/sql-formatter'

const {
  database: { database: name, port, host, user, password, logEnabled },
} = config

const logQuery = (query: string) => {
  logger.info(formatSql(query))
}

export const database = new Sequelize(name, user, password, {
  host,
  port,
  dialect: 'postgres',
  logging: logEnabled ? logQuery : false,
})

export const urlColumn = {
  type: DataTypes.STRING(255),
  allowNull: true,
  validate: {
    isUrl: true,
  },
}

export const primaryColumn = {
  type: DataTypes.UUID,
  primaryKey: true,
  defaultValue: DataTypes.UUIDV4,
}

export const initDatabase = async () => {
  try {
    await database.authenticate()
    logger.info('database up!')
  } catch (error) {
    logger.error('database down!', error)
  }
}
