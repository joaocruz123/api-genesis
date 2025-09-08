import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Inject,
} from '@nestjs/common'
import { CreateMemberDto } from './dto/create-member.dto'
import { UpdateMemberDto } from './dto/update-member.dto'
import { CreateMemberUseCase } from './use-cases/create-member.use-case'
import { FindAllMemberUseCase } from './use-cases/find-all.use-case'
import { FindIdMemberUseCase } from './use-cases/find-id.use-case'
import { UpdateMemberUseCase } from './use-cases/update-member.use-case'
import { StatusMemberUseCase } from './use-cases/status-member.use-case'
import { RemoveMemberUseCase } from './use-cases/remove-member.use-case'
import { Paginate, Paginated } from 'nestjs-paginate'
import type { PaginateQuery } from 'nestjs-paginate'
import { Member } from './entities/member.entity'
import { ApiTags } from '@nestjs/swagger'
import { FindAllSearchMemberUseCase } from './use-cases/find-all-search.use-case'
import { RegistrationMemberUseCase } from './use-cases/registration-member.use-case'
import { ResponseInterceptor } from '../response.interceptor'

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
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Member>> {
    return this.findAllMemberUseCase.execute(query)
  }

  @Get('/combobox')
  findAllSearch(@Paginate() query: PaginateQuery): Promise<Paginated<Member>> {
    return this.findAllMemberSearchUseCase.execute(query)
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.findIdMemberUseCase.execute(id)
    return {
      message: 'Associado recuperado com sucesso!',
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
      message: 'Associado atualizado com sucesso!',
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
      message: 'Associado com status atualizado com sucesso!',
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
      message: 'Associado registrado com sucesso!',
      result,
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.removeMemberUseCase.execute(id)
    return {
      message: 'Associado removido com sucesso!',
      result,
    }
  }
}
