import { Column, DataType, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING } = DataType

export interface GarmentAccessoryNote {
  accessoryNoteID?: number
  title?: string
  summary?: string
  orderNumber?: number
}

@Table({
  modelName: 'GarmentAccessoryNote',
  tableName: 'garment_accessory_note',
  timestamps: true
})
export default class GarmentAccessoryNoteSchema extends Model<GarmentAccessoryNote> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'accessory_note_id' })
  declare accessoryNoteID: number

  @Column({ type: STRING, field: 'title' })
  declare title: string

  @Column({ type: STRING, field: 'summary' })
  declare summary: string

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number
}
