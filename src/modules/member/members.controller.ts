import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import type { PaginateQuery } from 'nestjs-paginate'
import { Paginate, Paginated } from 'nestjs-paginate'
import { ResponseInterceptor } from '../../response.interceptor'
import { CreateMemberDto } from './dto/create-member.dto'
import { UpdateMemberDto } from './dto/update-member.dto'
import { Member } from './entities/member.entity'
import { CreateMemberUseCase } from './use-cases/create-member.use-case'
import { FindAllSearchMemberUseCase } from './use-cases/find-all-search.use-case'
import { FindAllMemberUseCase } from './use-cases/find-all.use-case'
import { FindIdMemberUseCase } from './use-cases/find-id.use-case'
import { RegistrationMemberUseCase } from './use-cases/registration-member.use-case'
import { RemoveMemberUseCase } from './use-cases/remove-member.use-case'
import { StatusMemberUseCase } from './use-cases/status-member.use-case'
import { UpdateMemberUseCase } from './use-cases/update-member.use-case'

@ApiTags('Members')
@UseInterceptors(ResponseInterceptor)
@Controller('members')
export class MembersController {
  constructor(
    private readonly createMemberUseCase: CreateMemberUseCase,
    private readonly findAllMemberUseCase: FindAllMemberUseCase,
    private readonly findAllMemberSearchUseCase: FindAllSearchMemberUseCase,
    private readonly findIdMemberUseCase: FindIdMemberUseCase,
    private readonly updateMemberUseCase: UpdateMemberUseCase,
    private readonly statusMemberUseCase: StatusMemberUseCase,
    private readonly registrationMemberUseCase: RegistrationMemberUseCase,
    private readonly removeMemberUseCase: RemoveMemberUseCase,
  ) {}

  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.createMemberUseCase.execute(createMemberDto)
  }

  @Get()
  async findAll(@Paginate() query: PaginateQuery) {
    const response = await this.findAllMemberUseCase.execute(query)
    return {
      message: 'Membros recuperados com sucesso!',
      result: response,
    }
  }

  @Get('/combobox')
  findAllSearch(@Paginate() query: PaginateQuery): Promise<Paginated<Member>> {
    return this.findAllMemberSearchUseCase.execute(query)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.findIdMemberUseCase.execute(id)
    return {
      message: 'Membro recuperado com sucesso!',
      result,
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    const result = await this.updateMemberUseCase.execute(id, updateMemberDto)
    return {
      message: 'Membro atualizado com sucesso!',
      result,
    }
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    const result = await this.statusMemberUseCase.execute(id, updateMemberDto)
    return {
      message: 'Membro com status atualizado com sucesso!',
      result,
    }
  }

  @Patch(':id/registration')
  async updateRegistration(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    const result = await this.registrationMemberUseCase.execute(
      id,
      updateMemberDto,
    )
    return {
      message: 'Membro registrado com sucesso!',
      result,
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.removeMemberUseCase.execute(id)
    return {
      message: 'Membro removido com sucesso!',
      result,
    }
  }
}
