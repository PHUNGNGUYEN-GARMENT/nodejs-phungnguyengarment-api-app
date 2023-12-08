import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ItemStatusType } from '~/type'
import PrintSchema from './print.model'
import ProductSchema from './product.model'

const { INTEGER, STRING } = DataType

export type PrintablePlace = {
  id?: number
  printID?: number
  productID?: number
  name?: string
  status?: ItemStatusType
}

@Table({
  modelName: 'PrintablePlace',
  tableName: 'printable-places',
  timestamps: true
})
export default class PrintablePlaceSchema extends Model<PrintablePlace> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'id' })
  declare id: number

  @Column({ type: INTEGER, field: 'print_id' })
  @ForeignKey(() => PrintSchema)
  declare printID: number

  @Column({ type: INTEGER, field: 'product_id' })
  @ForeignKey(() => ProductSchema)
  declare productID: number

  @Column({ type: STRING, field: 'name' })
  declare name: string

  @Column({ type: STRING, field: 'status' })
  declare status: string

  @BelongsTo(() => PrintSchema)
  declare print: PrintSchema

  @BelongsTo(() => PrintSchema)
  declare product: ProductSchema
}
