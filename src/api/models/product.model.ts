import { Column, DataType, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING, DATE, DOUBLE } = DataType

export interface Product {
  productID?: number
  productCode?: string
  quantityPO?: number
  dateInputNPL?: Date
  dateOutputFCR?: Date
  orderNumber?: number
}

@Table({
  modelName: 'Product',
  tableName: 'products',
  timestamps: true
})
export default class ProductSchema extends Model<Product> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'product_id' })
  declare productID: number

  @Column({ type: STRING, field: 'product_code' })
  declare productCode: string

  @Column({ type: DOUBLE, field: 'quantity_po' })
  declare quantityPO: number

  @Column({ type: DATE, field: 'date_input_npl' })
  declare dateInputNPL: Date

  @Column({ type: DATE, field: 'date_output_fcr' })
  declare dateOutputFCR: Date

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number
}
