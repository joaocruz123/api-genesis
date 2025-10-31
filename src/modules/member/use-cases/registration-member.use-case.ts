import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateMemberDto } from '../dto/update-member.dto'
import { Member } from '../entities/member.entity'

@Injectable()
export class RegistrationMemberUseCase {
  constructor(
    @InjectRepository(Member)
    private readonly partnerRepo: Repository<Member>,
  ) {}

  async execute(id: string, input: UpdateMemberDto) {
    const partner = await this.partnerRepo.findOneOrFail({ where: { id } })

    return this.partnerRepo.save(partner)
  }
}
