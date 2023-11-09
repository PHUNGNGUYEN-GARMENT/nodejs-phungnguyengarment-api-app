import { Column, DataType, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING, DATEONLY, DOUBLE } = DataType

export interface Product {
  productID?: number
  productCode?: string
  quantityPO?: number
  dateInputNPL?: string
  dateOutPutFCR?: string
  placePrintIn?: string
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

  @Column({ type: DATEONLY, field: 'date_input_npl' })
  declare dateInputNPL: string

  @Column({ type: DATEONLY, field: 'date_output_fcr' })
  declare dateOutPutFCR: string

  @Column({ type: STRING, field: 'place_print_in' })
  declare placePrintIn: string

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number
}
