import { Column, DataType, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING, DATEONLY, DOUBLE } = DataType

export interface ImportedLot {
  productID?: number
  importedID?: number
  quantity?: number
  unit?: string
  orderNumber?: number
}

@Table({
  modelName: 'ImportedLot',
  tableName: 'imported_lots',
  timestamps: true
})
export default class ImportedLotSchema extends Model<ImportedLot> {
  @Column({ type: INTEGER, field: 'product_id' })
  declare productID: number

  @Column({ type: INTEGER, field: 'imported_id' })
  declare importedID: number

  @Column({ type: DOUBLE, field: 'quantity' })
  declare quantity: number

  @Column({ type: STRING, field: 'unit' })
  declare unit: string

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number
}
