import { InjectRepository } from '@nestjs/typeorm'
import { Member } from '../entities/member.entity'
import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { UpdateMemberDto } from '../dto/update-member.dto'

@Injectable()
export class StatusMemberUseCase {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
  ) {}

  async execute(id: string, input: UpdateMemberDto) {
    const member = await this.memberRepo.findOneOrFail({ where: { id } })
    if (input.status) member.status = input.status

    return this.memberRepo.save(member)
  }
}
