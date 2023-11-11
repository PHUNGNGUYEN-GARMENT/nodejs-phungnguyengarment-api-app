import { Column, DataType, Model, Table } from 'sequelize-typescript'

const { INTEGER, BOOLEAN, STRING } = DataType

export interface User {
  userID?: number
  role?: 'user' | 'admin'
  fullName?: string
  email: string
  hashPassword?: string
  avatar?: string
  phone?: string
  workLocation?: string
  birthday?: string
  orderNumber?: number
  isTemp?: boolean
}

@Table({
  modelName: 'User',
  tableName: 'users',
  timestamps: true
})
export default class UserSchema extends Model<User> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'user_id' })
  declare userID: number

  @Column({ type: STRING, field: 'role' })
  declare role: string

  @Column({ type: STRING, field: 'full_name' })
  declare fullName: string

  @Column({ type: STRING, field: 'email' })
  declare email: string

  @Column({ type: STRING, field: 'hash_password' })
  declare hashPassword: string

  @Column({ type: STRING, field: 'avatar_url' })
  declare avatarUrl: string

  @Column({ type: STRING, field: 'phone_number' })
  declare phoneNumber: string

  @Column({ type: STRING, field: 'working_on' })
  declare workingOn: string

  @Column({ type: STRING, field: 'birthday' })
  declare birthday: string

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number

  @Column({ type: BOOLEAN, field: 'is_temp' })
  declare isTemp: boolean
}
