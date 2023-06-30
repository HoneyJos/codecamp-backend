import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver } from '@nestjs/apollo';
import { StarbucksModule } from './apis/starbucks/starbucks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Starbucks } from './apis/starbucks/entities/starbucks.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    StarbucksModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: './src/commons/graphql/schema.gql',
    }),
    TypeOrmModule.forRoot({
      type: process.env.DOCKER_DATABASE_TYPE as 'mysql',
      host: process.env.DOCKER_DATABASE_HOST,
      port: Number(process.env.DOCKER_DATABASE_PORT),
      username: process.env.DOCKER_DATABASE_USERNAME,
      password: process.env.DOCKER_DATABASE_PASSWORD,
      database: process.env.DOCKER_DATABASE_DATABASE,
      entities: [Starbucks],
      synchronize: true,
      logging: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
