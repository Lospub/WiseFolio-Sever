import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';
import { UserModule } from './user/user.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'mysql',
        version: '5.7',
        useNullAsDefault: true,
        connection: {
          database: "cashier_app",
          user: "root",
          password: "",
          host: "localhost",
          port: 3306,
          ssl: false
        },
      },
    }),
    UserModule,
    ExpenseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
