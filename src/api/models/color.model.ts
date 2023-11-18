import { Column, DataType, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING } = DataType

export interface Color {
  colorID?: number
  nameColor?: string
  hexColor?: string
  orderNumber?: number
}

@Table({
  modelName: 'Color',
  tableName: 'colors',
  timestamps: true
})
export default class ColorSchema extends Model<Color> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'color_id' })
  declare colorID: number

  @Column({ type: STRING, field: 'name_color' })
  declare nameColor: string

  @Column({ type: STRING, field: 'hex_color' })
  declare hexColor: string

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number
}
