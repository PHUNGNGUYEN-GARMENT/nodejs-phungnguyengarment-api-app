import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import GroupSchema from './group.model'
import ProductSchema from './product.model'

const { INTEGER, STRING } = DataType

export interface ProductGroup {
  groupID?: number
  productID?: number
  orderNumber?: number
}

@Table({
  modelName: 'ProductGroup',
  tableName: 'product_groups',
  timestamps: true
})
export default class ProductGroupSchema extends Model<ProductGroup> {
  @Column({ type: INTEGER, field: 'group_id' })
  @ForeignKey(() => GroupSchema)
  declare groupID: number

  @Column({ type: INTEGER, field: 'product_id' })
  @ForeignKey(() => ProductSchema)
  declare productID: string

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number
}
