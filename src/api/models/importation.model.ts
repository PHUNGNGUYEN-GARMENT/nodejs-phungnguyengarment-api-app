import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import ProductSchema from './product.model'

const { INTEGER, DATE } = DataType

export interface Importation {
  importationID?: number
  productID?: number
  dateImported?: number
  orderNumber?: number
}

@Table({
  modelName: 'Importation',
  tableName: 'importations',
  timestamps: true
})
export default class ImportationSchema extends Model<Importation> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'importation_id' })
  declare importationID: number

  @Column({ type: INTEGER, field: 'product_id' })
  @ForeignKey(() => ProductSchema)
  declare productID: number

  @Column({ type: DATE, field: 'date_imported' })
  declare dateImported: number

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number
}
