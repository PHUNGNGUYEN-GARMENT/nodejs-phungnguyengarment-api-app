import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ItemStatusType } from '~/type'
import ProductSchema from './product.model'

const { INTEGER, STRING, FLOAT, DATE } = DataType

export type GarmentAccessory = {
  id?: number
  productID?: number
  amountCutting?: number
  passingDeliveryDate?: string
  status?: ItemStatusType
}

@Table({
  modelName: 'GarmentAccessory',
  tableName: 'garment_accessories',
  timestamps: true
})
export default class GarmentAccessorySchema extends Model<GarmentAccessory> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'id' })
  declare id: number

  @Column({ type: INTEGER, field: 'product_id' })
  @ForeignKey(() => ProductSchema)
  declare productID: number

  @Column({ type: FLOAT, field: 'amount_cutting' })
  declare amountCutting: number

  @Column({ type: DATE, field: 'passing_delivery_date' })
  declare passingDeliveryDate: string

  @Column({ type: STRING, field: 'status' })
  declare status: string

  @BelongsTo(() => ProductSchema)
  declare product: ProductSchema
}
