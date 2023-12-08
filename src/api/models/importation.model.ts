import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ItemStatusType } from '~/type'
import ProductSchema from './product.model'

const { INTEGER, STRING, FLOAT, DATE } = DataType

export type Importation = {
  id?: number
  productID?: number
  quantity?: number
  status?: ItemStatusType
  dateImported?: Date
}

@Table({
  modelName: 'Importation',
  tableName: 'importations',
  timestamps: true
})
export default class ImportationSchema extends Model<Importation> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'id' })
  declare id: number

  @Column({ type: INTEGER, field: 'product_id' })
  @ForeignKey(() => ProductSchema)
  declare productID: number

  @Column({ type: STRING, field: 'status' })
  declare status: string

  @Column({ type: FLOAT, field: 'quantity' })
  declare quantity: number

  @Column({ type: DATE, field: 'date_imported' })
  declare dateImported: Date

  @BelongsTo(() => ProductSchema)
  declare product: ProductSchema
}
