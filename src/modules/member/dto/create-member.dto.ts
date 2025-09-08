export class CreateMemberDto {
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
}
