import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ActivateModule } from './activate/activate.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true,
  }),
  PrismaModule,
  AuthModule,
  EmailModule,
  UserModule,
  CategoryModule,
  ProductModule,
  ActivateModule,],
})
export class AppModule {}
