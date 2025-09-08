import { Injectable } from '@nestjs/common'
import { CreateMemberDto } from './dto/create-member.dto'
import { UpdateMemberDto } from './dto/update-member.dto'
import { Repository } from 'typeorm'
import { Member } from './entities/member.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { registrationGenerator } from './helpers/resgistrationGenerator'

@Injectable()
export class MembersService {
  constructor(
    @InjectRepository(Member)
    private memberRepo: Repository<Member>,
  ) {}

  create(createMemberDto: CreateMemberDto) {
    const member = new Member(createMemberDto)

    if (member.name && member.cpf) {
      member.registration_member = member.cpf + registrationGenerator()
    }
    return this.memberRepo.save(member)
  }

  findAll() {
    return this.memberRepo.find()
  }

  findOne(id: string) {
    return this.memberRepo.findOneOrFail({ where: { id } })
  }

  async update(id: string, updatePartnerDto: UpdateMemberDto) {
    const member = await this.memberRepo.findOneOrFail({ where: { id } })

    updatePartnerDto.name && (member.name = updatePartnerDto.name)
    updatePartnerDto.cep && (member.cep = updatePartnerDto.cep)
    updatePartnerDto.neighborhood &&
      (member.neighborhood = updatePartnerDto.neighborhood)
    updatePartnerDto.city && (member.city = updatePartnerDto.city)
    updatePartnerDto.state && (member.state = updatePartnerDto.state)
    updatePartnerDto.street && (member.street = updatePartnerDto.street)
    updatePartnerDto.number && (member.number = updatePartnerDto.number)
    updatePartnerDto.complement &&
      (member.complement = updatePartnerDto.complement)
    updatePartnerDto.marital_status &&
      (member.marital_status = updatePartnerDto.marital_status)
    updatePartnerDto.date_birth &&
      (member.date_birth = updatePartnerDto.date_birth)
    updatePartnerDto.avatar && (member.avatar = updatePartnerDto.avatar)
    updatePartnerDto.status && (member.status = updatePartnerDto.status)

    return this.memberRepo.save(member)
  }

  remove(id: string) {
    return `This action removes a #${id} member`
  }
}
