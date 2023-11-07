import { Column, DataType, Model, Table } from 'sequelize-typescript'

const { INTEGER, BOOLEAN, STRING } = DataType

export interface User {
  userID?: number
  role: 'user' | 'admin'
  fullname?: string
  email: string
  password: string
  avatar?: string
  phone?: string
  workLocation: string
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
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true })
  declare user_id: number

  @Column({ type: STRING })
  declare role: string

  @Column({ type: STRING })
  declare full_name: string

  @Column({ type: STRING })
  declare email: string

  @Column({ type: STRING })
  declare hash_password: string

  @Column({ type: STRING })
  declare avatar: string

  @Column({ type: STRING })
  declare phone: string

  @Column({ type: STRING })
  declare working_on: string

  @Column({ type: STRING })
  declare birthday: string

  @Column({ type: INTEGER })
  declare order_number: number

  @Column({ type: BOOLEAN })
  declare is_temp: boolean

  // @BeforeCreate
  // static hashPasswordBeforeUpdate(user: UserSchema) {
  //   user.hash_password = bcrypt.hashSync(user.hash_password, 10)
  //   console.log('>>>')
  // }
}

// UserSchema.addHook('beforeSave', (self) => {})
// UserSchema.hasMany(CartSchema, { foreignKey: 'userID' })
// UserSchema.hasMany(FavoriteSchema, { foreignKey: 'userID' })
// UserSchema.hasMany(RateSchema, { foreignKey: 'userID' })
// UserSchema.hasMany(FollowerSchema, { foreignKey: 'userID' })
// UserSchema.hasMany(TransitionSchema, { foreignKey: 'userID' })
// UserSchema.hasMany(ReservationSchema, { foreignKey: 'userID' })
