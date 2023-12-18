import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ItemStatusType } from '~/type'
import AccessoryNoteSchema from './accessory-note.model'
import ProductSchema from './product.model'

const { INTEGER, STRING, FLOAT, DATE } = DataType

export type GarmentAccessoryNote = {
  id?: number
  garmentAccessoryID?: number
  accessoryNoteID?: number
  status?: ItemStatusType
}

@Table({
  modelName: 'GarmentAccessoryNote',
  tableName: 'garment_accessory-note',
  timestamps: true
})
export default class GarmentAccessoryNoteSchema extends Model<GarmentAccessoryNote> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'id' })
  declare id: number

  @Column({ type: INTEGER, field: 'garment_accessory_id' })
  @ForeignKey(() => GarmentAccessoryNoteSchema)
  declare garmentAccessoryID: number

  @Column({ type: INTEGER, field: 'accessory_note_id' })
  @ForeignKey(() => ProductSchema)
  declare accessoryNoteID: number

  @Column({ type: STRING, field: 'status' })
  declare status: string

  @BelongsTo(() => ProductSchema)
  declare product: ProductSchema

  @BelongsTo(() => AccessoryNoteSchema)
  declare accessoryNote: AccessoryNoteSchema
}
