import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdateMemberDto } from '../dto/update-member.dto'
import { Member } from '../entities/member.entity'

@Injectable()
export class UpdateMemberUseCase {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
  ) {}

  async execute(id: string, input: UpdateMemberDto) {
    const member = await this.memberRepo.findOneOrFail({ where: { id } })

    input.name && (member.name = input.name)
    input.cep && (member.cep = input.cep)
    input.neighborhood && (member.neighborhood = input.neighborhood)
    input.city && (member.city = input.city)
    input.state && (member.state = input.state)
    input.street && (member.street = input.street)
    input.number && (member.number = input.number)
    input.complement && (member.complement = input.complement)
    input.marital_status && (member.marital_status = input.marital_status)
    input.date_birth && (member.date_birth = input.date_birth)
    input.function && (member.function = input.function)
    input.avatar && (member.avatar = input.avatar)

    return this.memberRepo.save(member)
  }
}
