import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { registrationGenerator } from '../helpers/resgistrationGenerator'

@Entity()
export class Member {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column({ default: registrationGenerator() })
  registration_member: string

  @Column({ type: 'varchar', nullable: true })
  cep?: string | null

  @Column({ type: 'varchar', nullable: true })
  street?: string | null

  @Column({ type: 'varchar', nullable: true })
  neighborhood?: string | null

  @Column({ type: 'varchar', nullable: true })
  city?: string | null

  @Column({ type: 'varchar', nullable: true })
  state?: string | null

  @Column({ type: 'varchar', nullable: true })
  number?: string | null

  @Column({ type: 'varchar', nullable: true })
  complement?: string | null

  @Column({ type: 'varchar', nullable: true })
  marital_status?: string | null

  @Column({ type: 'date', nullable: true })
  date_birth?: Date | null

  @Column()
  rg: string

  @Column()
  sexo: string

  @Column()
  phone: string

  @Column()
  cpf: string

  @Column({ type: 'date', nullable: true })
  conversion_date?: Date | null

  @Column({ type: 'bool', nullable: true })
  baptized?: boolean | null

  @Column({ type: 'bool', nullable: true })
  away?: boolean | null

  @Column({ type: 'varchar', nullable: true })
  function?: string | null

  @Column()
  status: boolean

  @Column({ type: 'varchar', nullable: true })
  avatar?: string | null

  constructor(
    props: {
      name: string
      registration_member: string
      cep?: string | null
      street?: string | null
      neighborhood?: string | null
      city?: string | null
      state?: string | null
      number?: string | null
      complement?: string | null
      marital_status?: string | null
      date_birth?: Date | null
      rg: string
      sexo: string
      phone: string
      cpf: string
      conversion_date?: Date | null
      baptized?: boolean | null
      away?: boolean | null
      function?: string | null
      avatar: string | null
      status: boolean
    },
    id?: string,
  ) {
    Object.assign(this, props)
    this.id = id ?? uuidv4()
  }
}
