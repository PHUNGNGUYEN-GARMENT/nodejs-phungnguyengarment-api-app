import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ItemStatusType } from '~/type'
import ProductSchema from './product.model'

const { INTEGER, STRING, DOUBLE, DATE } = DataType

export interface Importation {
  id?: number
  productID?: number
  status?: ItemStatusType
  quantity?: number
  dateImported?: Date
  orderNumber?: number
}

@Table({
  modelName: 'Importation',
  tableName: 'importations',
  timestamps: true
})
export default class ImportationSchema extends Model<Importation> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'id' })
  declare id: number

  @Column({ type: INTEGER, field: 'product_id' })
  @ForeignKey(() => ProductSchema)
  declare productID: number

  @Column({ type: STRING, field: 'status' })
  declare status: string

  @Column({ type: DOUBLE, field: 'quantity' })
  declare quantity: number

  @Column({ type: DATE, field: 'date_imported' })
  declare dateImported: Date

  @Column({ type: INTEGER, field: 'order_number', defaultValue: 0 })
  declare orderNumber: number

  @BelongsTo(() => ProductSchema)
  declare product: ProductSchema
}
