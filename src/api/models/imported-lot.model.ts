import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import dbConnection from '~/models/index'
import ImportationSchema from './importation.model'
import ProductSchema from './product.model'
const { INTEGER, STRING, DOUBLE } = DataType

export interface ImportedLot {
  productID?: number
  importedID?: number
  quantity?: number
  unit?: string
  orderNumber?: number
}

@Table({
  modelName: 'ImportedLot',
  tableName: 'imported_lots',
  timestamps: true
})
export default class ImportedLotSchema extends Model<ImportedLot> {
  @Column({ type: INTEGER, field: 'product_id' })
  @ForeignKey(() => ProductSchema)
  declare productID: number

  @Column({ type: INTEGER, field: 'imported_id' })
  @ForeignKey(() => ImportationSchema)
  declare importedID: number

  @Column({ type: DOUBLE, field: 'quantity' })
  declare quantity: number

  @Column({ type: STRING, field: 'unit' })
  declare unit: string

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number
}
