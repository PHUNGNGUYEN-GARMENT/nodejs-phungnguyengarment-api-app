import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import ProductSchema from './product.model'

const { INTEGER, STRING, FLOAT, BOOLEAN } = DataType

export interface GarmentAccessory {
  garmentAccessoryID?: number
  productID?: number
  notesOther?: string
  amountCuttingAccessory?: number
  dateDeliveredChain?: string
  syncGarmentAccessoryState?: boolean
  syncPackageAccessoryState?: boolean
  orderNumber?: number
}

@Table({
  modelName: 'GarmentAccessory',
  tableName: 'garment_accessories',
  timestamps: true
})
export default class GarmentAccessorySchema extends Model<GarmentAccessory> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'garment_accessory_id' })
  declare garmentAccessoryID: number

  @Column({ type: INTEGER, field: 'product_id' })
  @ForeignKey(() => ProductSchema)
  declare productID: number

  @Column({ type: STRING, field: 'notes_other' })
  declare notesOther: string

  @Column({ type: FLOAT, field: 'amount_cutting_accessory' })
  declare amountCuttingAccessory: number

  @Column({ type: STRING, field: 'date_delivered_chain' })
  declare dateDeliveredChain: string

  @Column({ type: BOOLEAN, field: 'sync_garment_accessory_state' })
  declare syncGarmentAccessoryState: boolean

  @Column({ type: BOOLEAN, field: 'sync_package_accessory_state' })
  declare syncPackageAccessoryState: boolean

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number
}
