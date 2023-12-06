import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ItemStatusType } from '~/type'
import ColorSchema from './color.model'
import ProductSchema from './product.model'

const { INTEGER, STRING } = DataType

export interface ProductColor {
  id?: number
  colorID?: number
  productID?: number
  status?: ItemStatusType
  orderNumber?: number
}

@Table({
  modelName: 'ProductColor',
  tableName: 'product_colors',
  timestamps: true
})
export default class ProductColorSchema extends Model<ProductColor> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'id' })
  declare id: number

  @Column({ type: INTEGER, field: 'color_id' })
  @ForeignKey(() => ColorSchema)
  declare colorID: number

  @Column({ type: INTEGER, field: 'product_id' })
  @ForeignKey(() => ProductSchema)
  declare productID: number

  @Column({ type: STRING, field: 'status' })
  declare status: string

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number

  @BelongsTo(() => ProductSchema)
  declare product: ProductSchema

  @BelongsTo(() => ColorSchema)
  declare color: ColorSchema
}
