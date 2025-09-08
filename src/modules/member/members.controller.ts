import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  UseInterceptors,
  UseGuards,
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
//import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { ApiTags } from '@nestjs/swagger'
import { FindAllSearchMemberUseCase } from './use-cases/find-all-search.use-case'
//import { RolesGuard } from 'src/auth/roles.guard'
//import { Roles } from 'src/auth/roles.decorator'
//import { Role } from 'src/enums/role.enum'
import { RegistrationMemberUseCase } from './use-cases/registration-member.use-case'
import { ResponseInterceptor } from '../response.interceptor'

@ApiTags('Members')
@Controller('members')
export class MembersController {
  @Inject(CreateMemberUseCase)
  private readonly createMemberUseCase: CreateMemberUseCase

  @Inject(FindAllMemberUseCase)
  private readonly findAllMemberUseCase: FindAllMemberUseCase

  @Inject(FindAllSearchMemberUseCase)
  private readonly findAllMemberSeachrUseCase: FindAllSearchMemberUseCase

  @Inject(FindIdMemberUseCase)
  private readonly findIdMemberUseCase: FindIdMemberUseCase

  @Inject(UpdateMemberUseCase)
  private readonly updateMemberUseCase: UpdateMemberUseCase

  @Inject(StatusMemberUseCase)
  private readonly statusMemberUseCase: StatusMemberUseCase

  @Inject(RegistrationMemberUseCase)
  private readonly registrationsMemberUseCase: RegistrationMemberUseCase

  @Inject(RemoveMemberUseCase)
  private readonly removeMemberUseCase: RemoveMemberUseCase

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Post()
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.createMemberUseCase.execute(createMemberDto)
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Get()
  findAll(@Paginate() query: PaginateQuery): Promise<Paginated<Member>> {
    return this.findAllMemberUseCase.execute(query)
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Get('/members-combobox')
  findAllSearch(@Paginate() query: PaginateQuery): Promise<Paginated<Member>> {
    return this.findAllMemberSeachrUseCase.execute(query)
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Get(':id')
  @UseInterceptors(ResponseInterceptor)
  async findOne(@Param('id') id: string) {
    const result = await this.findIdMemberUseCase.execute(id)
    return {
      message: 'Associado recuperado com sucesso!',
      result: result,
    }
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Patch(':id')
  @UseInterceptors(ResponseInterceptor)
  async update(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    const result = await this.updateMemberUseCase.execute(id, updateMemberDto)
    return {
      message: 'Associado atualizado com sucesso!',
      result: result,
    }
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Patch(':id/status')
  @UseInterceptors(ResponseInterceptor)
  async updateStatus(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    const result = await this.statusMemberUseCase.execute(id, updateMemberDto)
    return {
      message: 'Associado com status atualizado com sucesso!',
      result: result,
    }
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Patch(':id/registration')
  @UseInterceptors(ResponseInterceptor)
  async updateRegistration(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    const result = await this.registrationsMemberUseCase.execute(
      id,
      updateMemberDto,
    )
    return {
      message: 'Associado registrado com sucesso!',
      result: result,
    }
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  @Delete(':id')
  @UseInterceptors(ResponseInterceptor)
  remove(@Param('id') id: string) {
    const result = this.removeMemberUseCase.execute(id)
    return {
      message: 'Associado removido com sucesso!',
      result: result,
    }
  }
}
