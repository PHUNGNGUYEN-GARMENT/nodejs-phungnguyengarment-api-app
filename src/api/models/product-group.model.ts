import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ItemStatusType } from '~/type'
import GroupSchema from './group.model'
import ProductSchema from './product.model'

const { INTEGER, STRING } = DataType

export interface ProductGroup {
  id?: number
  groupID?: number
  productID?: number
  name?: string
  status?: ItemStatusType
}

@Table({
  modelName: 'ProductGroup',
  tableName: 'product_groups',
  timestamps: true
})
export default class ProductGroupSchema extends Model<ProductGroup> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'id' })
  declare id: number

  @Column({ type: INTEGER, field: 'group_id' })
  @ForeignKey(() => GroupSchema)
  declare groupID: number

  @Column({ type: INTEGER, field: 'product_id' })
  @ForeignKey(() => ProductSchema)
  declare productID: string

  @Column({ type: STRING, field: 'name' })
  declare name: string

  @Column({ type: STRING, field: 'status' })
  declare status: string
}
