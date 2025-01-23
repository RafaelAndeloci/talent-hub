import './models'
import { logger } from '../../shared/services/logging-service'
import { database } from './database'
import { formatSql } from '../../shared/utils/sql-formatter'

const performDatabaseAction = async () => {
  const type = process.argv[2]

  try {
    logger.info('init database authentication')
    await database.authenticate({
      logging: (sql) => logger.info(formatSql(sql)),
    })
    logger.info('database authentication success')

    switch (type) {
      case 'migrate': {
        logger.info('syncing database')
        await database.sync({
          force: false,
          alter: true,
          logging: (sql) => logger.info(formatSql(sql)),
        })
        logger.info('database synced')
        break
      }

      case 'drop': {
        logger.info('dropping tables')
        await database.drop({
          cascade: true,
          logging: (sql) => logger.info(formatSql(sql)),
        })
        await database.query(
          'DROP SCHEMA public CASCADE; CREATE SCHEMA public;',
        )
        logger.info('tables dropped')
        break
      }

      case 'truncate': {
        logger.info('truncating tables')
        await database.truncate({
          force: true,
          cascade: true,
          logging: (sql) => logger.info(formatSql(sql)),
        })
        logger.info('tables truncated')
        break
      }

      default: {
        logger.info('no action taken')
        break
      }
    }

    process.exit(0)
  } catch (e) {
    logger.error(e)
    process.exit(1)
  }
}

performDatabaseAction()
