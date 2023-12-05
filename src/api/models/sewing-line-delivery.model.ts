import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { ItemStatusType } from '~/type'

const { INTEGER, STRING } = DataType

export interface SewingLineDelivery {
  id?: number
  name?: string
  status?: ItemStatusType
  orderNumber?: number
}

@Table({
  modelName: 'SewingLineDelivery',
  tableName: 'sewing-line-deliveries',
  timestamps: true
})
export default class SewingLineDeliverySchema extends Model<SewingLineDelivery> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'id' })
  declare id: number

  @Column({ type: STRING, field: 'name' })
  declare name: string

  @Column({ type: STRING, field: 'status' })
  declare status: string

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number
}
