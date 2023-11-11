import { Column, DataType, Model, Table } from 'sequelize-typescript'

const { INTEGER, STRING } = DataType

export interface Color {
  colorID?: number
  nameColor?: string
  rgbColor?: string
  hexColor?: string
  cmykColor?: string
  hsvColor?: string
  hslColor?: string
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

  @Column({ type: STRING, field: 'rgb_color' })
  declare rgbColor: string

  @Column({ type: STRING, field: 'hex_color' })
  declare hexColor: string

  @Column({ type: STRING, field: 'cmyk_color' })
  declare cmykColor: string

  @Column({ type: STRING, field: 'hsv_color' })
  declare hsvColor: string

  @Column({ type: STRING, field: 'hsl_color' })
  declare hslColor: string

  @Column({ type: INTEGER, field: 'order_number' })
  declare orderNumber: number
}
