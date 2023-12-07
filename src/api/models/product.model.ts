import { Column, DataType, HasMany, HasOne, Model, Table } from 'sequelize-typescript'
import { ItemStatusType } from '~/type'
import ImportationSchema from './importation.model'
import ProductColorSchema from './product-color.model'

const { INTEGER, STRING, DATE, DOUBLE } = DataType

export type Product = {
  id?: number
  productCode?: string
  quantityPO?: number
  status?: ItemStatusType
  dateInputNPL?: Date
  dateOutputFCR?: Date
}

@Table({
  modelName: 'Product',
  tableName: 'products',
  timestamps: true
})
export default class ProductSchema extends Model<Product> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'id' })
  declare id: number

  @Column({ type: STRING, field: 'product_code' })
  declare productCode: string

  @Column({ type: DOUBLE, field: 'quantity_po' })
  declare quantityPO: number

  @Column({ type: STRING, field: 'status' })
  declare status: string

  @Column({ type: DATE, field: 'date_input_npl' })
  declare dateInputNPL: Date

  @Column({ type: DATE, field: 'date_output_fcr' })
  declare dateOutputFCR: Date

  @HasMany(() => ImportationSchema)
  declare importations: ImportationSchema[]

  @HasOne(() => ProductColorSchema)
  declare productColor: ProductColorSchema
}
