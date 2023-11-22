import { Column, DataType, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING } = DataType

export interface Print {
  printID?: number
  name?: string
  orderNumber?: number
}

@Table({
  modelName: 'Print',
  tableName: 'prints',
  timestamps: true
})
export default class PrintSchema extends Model<Print> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'print_id' })
  declare printID: number

  @Column({ type: STRING, field: 'name' })
  declare name: string

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number
}
