import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { ItemStatusType } from '~/type'

const { INTEGER, STRING } = DataType

export interface Print {
  id?: number
  name?: string
  status?: ItemStatusType
  orderNumber?: number
}

@Table({
  modelName: 'Print',
  tableName: 'prints',
  timestamps: true
})
export default class PrintSchema extends Model<Print> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'id' })
  declare id: number

  @Column({ type: STRING, field: 'name' })
  declare name: string

  @Column({ type: STRING, field: 'status' })
  declare status: string

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number
}
