import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Member } from './entities/member.entity'
import { CreateMemberUseCase } from './use-cases/create-member.use-case'
import { FindAllMemberUseCase } from './use-cases/find-all.use-case'
import { FindIdMemberUseCase } from './use-cases/find-id.use-case'
import { UpdateMemberUseCase } from './use-cases/update-member.use-case'
import { StatusMemberUseCase } from './use-cases/status-member.use-case'
import { RemoveMemberUseCase } from './use-cases/remove-member.use-case'
import { MembersController } from './members.controller'
import { FindAllSearchMemberUseCase } from './use-cases/find-all-search.use-case'
import { RegistrationMemberUseCase } from './use-cases/registration-member.use-case'

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [MembersController],
  providers: [
    CreateMemberUseCase,
    FindAllMemberUseCase,
    FindIdMemberUseCase,
    UpdateMemberUseCase,
    StatusMemberUseCase,
    RegistrationMemberUseCase,
    RemoveMemberUseCase,
    FindAllSearchMemberUseCase,
  ],
})

export class MembersModule {}
