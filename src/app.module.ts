import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmConfigService } from './config/config.service'
import { MembersModule } from './modules/member/members.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    MembersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
