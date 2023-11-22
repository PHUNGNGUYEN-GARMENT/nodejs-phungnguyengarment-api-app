import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import PrintSchema from './print.model'
import ProductSchema from './product.model'

const { INTEGER } = DataType

export interface PrintablePlace {
  printID?: number
  productID?: number
  orderNumber?: number
}

@Table({
  modelName: 'PrintablePlace',
  tableName: 'printable-places',
  timestamps: true
})
export default class PrintablePlaceSchema extends Model<PrintablePlace> {
  @Column({ type: INTEGER, field: 'print_id' })
  @ForeignKey(() => PrintSchema)
  declare printID: number

  @Column({ type: INTEGER, field: 'product_id' })
  @ForeignKey(() => ProductSchema)
  declare productID: number

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number
}
