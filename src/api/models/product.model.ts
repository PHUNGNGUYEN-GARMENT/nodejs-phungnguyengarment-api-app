import { Column, DataType, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING, DATE, DOUBLE } = DataType

export interface Product {
  id?: number
  productCode?: string
  quantityPO?: number
  dateInputNPL?: string
  dateOutputFCR?: string
  orderNumber?: number
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

  @Column({ type: DATE, field: 'date_input_npl' })
  declare dateInputNPL: string

  @Column({ type: DATE, field: 'date_output_fcr' })
  declare dateOutputFCR: string

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number
}
