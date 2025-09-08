import { InjectRepository } from '@nestjs/typeorm'
import { Member } from '../entities/member.entity'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RemoveMemberUseCase {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
  ) {}

  async execute(id: string) {
    const member = await this.memberRepo.findOneOrFail({ where: { id } })
    return this.memberRepo.remove(member)
  }
}
