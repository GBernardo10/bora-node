require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});
module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DBNAME,
  storage: './__tests__/database.sqlite',
  define: {
    timestamps: true,
    underscored: true,
  },
};
