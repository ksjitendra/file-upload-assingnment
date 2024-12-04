import { Sequelize } from 'sequelize-typescript';
import { models } from 'src/models';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      try {

        const sequelize = new Sequelize({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: 5432,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            models: [...models],
          });
        //   await sequelize.sync();
          console.log('DB connected successfully');
          
          return sequelize;
        
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        console.log(error.message);
        
      }
    },
  },
];