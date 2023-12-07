import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ItemStatusType } from '~/type'
import ProductSchema from './product.model'
import SewingLineSchema from './sewing-line.model'

const { INTEGER, STRING, DOUBLE } = DataType

export type SewingLineDelivery = {
  id?: number
  sewingLineID?: number
  productID?: number
  quantityOrigin?: number
  quantitySewed?: number
  expiredDate?: string
  status?: ItemStatusType
}

@Table({
  modelName: 'SewingLineDelivery',
  tableName: 'sewing-line-deliveries',
  timestamps: true
})
export default class SewingLineDeliverySchema extends Model<SewingLineDelivery> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'id' })
  declare id: number

  @Column({ type: INTEGER, field: 'sewing_line_id' })
  @ForeignKey(() => SewingLineSchema)
  declare sewingLineID: number

  @Column({ type: INTEGER, field: 'product_id' })
  @ForeignKey(() => SewingLineSchema)
  declare productID: number

  @Column({ type: DOUBLE, field: 'quantity_origin' })
  declare quantityOrigin: number

  @Column({ type: DOUBLE, field: 'quantity_sewed' })
  declare quantitySewed: number

  @Column({ type: INTEGER, field: 'expired_date' })
  declare expiredDate: Date

  @Column({ type: STRING, field: 'status' })
  declare status: string

  @BelongsTo(() => SewingLineSchema)
  declare sewingLine: SewingLineSchema

  @BelongsTo(() => ProductSchema)
  declare product: ProductSchema
}
