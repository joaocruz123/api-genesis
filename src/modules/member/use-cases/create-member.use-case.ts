import { InjectRepository } from '@nestjs/typeorm'
import { CreateMemberDto } from '../dto/create-member.dto'
import { Member } from '../entities/member.entity'
import { Repository } from 'typeorm'
import { registrationGenerator } from '../helpers/resgistrationGenerator'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CreateMemberUseCase {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
  ) {}

  execute(input: CreateMemberDto) {
    const member = new Member(input)

    if (input.name && input.cpf) {
      member.registration_member = member.cpf + registrationGenerator()
    }
    return this.memberRepo.save(member)
  }
}
