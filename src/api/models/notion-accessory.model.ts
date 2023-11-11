import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import GarmentAccessoryNoteSchema from './garment-accessory-note.model'

const { INTEGER, STRING } = DataType

export interface NotionAccessory {
  accessoryNoteID?: number
  garmentAccessoryID?: number
  orderNumber?: number
}

@Table({
  modelName: 'NotionAccessory',
  tableName: 'notion_accessories',
  timestamps: true
})
export default class NotionAccessorySchema extends Model<NotionAccessory> {
  @Column({ type: INTEGER, field: 'accessory_note_id' })
  @ForeignKey(() => GarmentAccessoryNoteSchema)
  declare accessoryNoteID: number

  @Column({ type: INTEGER, field: 'garment_accessory_id' })
  // @ForeignKey(() => )
  declare garmentAccessoryID: number

  @Column({ type: STRING, field: 'title' })
  declare title: string

  @Column({ type: STRING, field: 'summary' })
  declare summary: string

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number
}
