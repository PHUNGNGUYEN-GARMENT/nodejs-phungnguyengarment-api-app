const configuration = {
  development: {
    username: 'root',
    password: 'root@123',
    database: 'testdb',
    host: 'localhost'
  },
  test: {
    username: '',
    password: null,
    database: '',
    host: '',
    dialect: 'mysql'
  },
  production: {
    username: '',
    password: null,
    database: '',
    host: '',
    dialect: 'mysql'
  }
}

export default configuration
