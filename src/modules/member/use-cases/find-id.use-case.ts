import { InjectRepository } from '@nestjs/typeorm'
import { Member } from '../entities/member.entity'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FindIdMemberUseCase {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
  ) {}

  execute(id: string) {
    return this.memberRepo.findOneOrFail({ where: { id } })
  }
}
