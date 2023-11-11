import { Column, DataType, Model, Table } from 'sequelize-typescript'

const { INTEGER, DATE } = DataType

export interface Importation {
  importedID?: number
  productID?: number
  dateImported?: number
  orderNumber?: number
}

@Table({
  modelName: 'Importation',
  tableName: 'importations',
  timestamps: true
})
export default class ImportationSchema extends Model<Importation> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'imported_id' })
  declare importedID: number

  @Column({ type: INTEGER, field: 'product_id' })
  declare productID: number

  @Column({ type: DATE, field: 'date_imported' })
  declare dateImported: number

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number
}
