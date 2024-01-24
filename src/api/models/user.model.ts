import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { ItemStatusType, UserRole } from '~/type'

const { INTEGER, STRING } = DataType

export interface User {
  id?: number
  role?: UserRole
  fullName?: string
  username: string
  password?: string
  avatar?: string
  phone?: string
  workDescription?: string
  birthday?: string
  status?: ItemStatusType
}

@Table({
  modelName: 'User',
  tableName: 'users',
  timestamps: true
})
export default class UserSchema extends Model<User> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'id' })
  declare id: number

  @Column({ type: STRING, field: 'role' })
  declare role: UserRole

  @Column({ type: STRING, field: 'full_name' })
  declare fullName: string

  @Column({ type: STRING, field: 'username' })
  declare username: string

  @Column({ type: STRING, field: 'password' })
  declare password: string

  @Column({ type: STRING, field: 'avatar' })
  declare avatar: string

  @Column({ type: STRING, field: 'phone' })
  declare phone: string

  @Column({ type: STRING, field: 'workDescription' })
  declare workDescription: string

  @Column({ type: STRING, field: 'birthday' })
  declare birthday: string

  @Column({ type: STRING, field: 'status' })
  declare status: ItemStatusType
}
