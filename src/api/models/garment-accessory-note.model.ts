import { Column, DataType, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING } = DataType

export interface GarmentAccessoryNote {
  accessoriesNoteID?: number
  title?: string
  summary?: string
  orderNumber?: number
}

@Table({
  modelName: 'GarmentAccessoryNote',
  tableName: 'garment_accessories_notes',
  timestamps: true
})
export default class GarmentAccessoryNoteSchema extends Model<GarmentAccessoryNote> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'accessories_note_id' })
  declare accessoriesNoteID: number

  @Column({ type: STRING, field: 'title' })
  declare title: string

  @Column({ type: STRING, field: 'summary' })
  declare summary: string

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number
}
