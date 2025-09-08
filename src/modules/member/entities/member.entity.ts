import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { registrationGenerator } from '../helpers/resgistrationGenerator'

@Entity()
export class Member {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
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

  constructor(props: Partial<Member>, id?: string) {
    Object.assign(this, props)
    this.id = id ?? uuidv4()
    this.registration_member =
      props.registration_member ?? registrationGenerator()
  }
}
