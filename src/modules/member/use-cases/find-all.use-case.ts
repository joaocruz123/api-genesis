import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate'
import { Repository } from 'typeorm'
import { Member } from '../entities/member.entity'

@Injectable()
export class FindAllMemberUseCase {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepo: Repository<Member>,
  ) {}

  execute(query: PaginateQuery): Promise<Paginated<Member>> {
    return paginate(query, this.memberRepo, {
      sortableColumns: ['id', 'name', 'cpf'],
      defaultSortBy: [['name', 'ASC']],
      searchableColumns: ['name', 'cpf', 'status'],
      select: [
        'id',
        'name',
        'cpf',
        'rg',
        'status',
      ],
    })
  }
}
