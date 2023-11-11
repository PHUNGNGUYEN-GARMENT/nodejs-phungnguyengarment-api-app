import { Column, DataType, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING } = DataType

export interface Group {
  groupID?: number
  name?: string
  orderNumber?: number
}

@Table({
  modelName: 'Group',
  tableName: 'groups',
  timestamps: true
})
export default class GroupSchema extends Model<Group> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'group_id' })
  declare groupID: number

  @Column({ type: STRING, field: 'name' })
  declare name: string

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number
}
