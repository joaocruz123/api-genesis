import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate'
import { Repository } from 'typeorm'
import { Member } from '../entities/member.entity'

@Injectable()
export class FindAllSearchMemberUseCase {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
  ) {}

  execute(query: PaginateQuery): Promise<Paginated<Member>> {
    return paginate(query, this.memberRepo, {
      sortableColumns: ['id', 'name', 'cpf'],
      defaultSortBy: [['name', 'ASC']],
      searchableColumns: ['name'],
      select: [
        'id',
        'name',
        'cpf',
        'registration_member',
        'cep',
        'street',
        'neighborhood',
        'city',
        'state',
        'number',
        'complement',
        'marital_status',
        'date_birth',
        'rg',
        'function',
        'avatar',
        'status',
      ],
    })
  }
}
