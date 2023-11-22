import { Column, DataType, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING } = DataType

export interface SewingLineDelivery {
  sewingLineDeliveryID?: number
  sewingLine?: string
  orderNumber?: number
}

@Table({
  modelName: 'SewingLineDelivery',
  tableName: 'sewing-line-deliveries',
  timestamps: true
})
export default class SewingLineDeliverySchema extends Model<SewingLineDelivery> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'sewing_line_delivery_id' })
  declare sewingLineDeliveryID: number

  @Column({ type: STRING, field: 'sewing_line' })
  declare sewingLine: string

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number
}
