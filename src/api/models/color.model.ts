import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { ItemStatusType } from '~/type'

const { INTEGER, STRING } = DataType

export type Color = {
  id?: number
  nameColor?: string
  hexColor?: string
  status?: ItemStatusType
}

@Table({
  modelName: 'Color',
  tableName: 'colors',
  timestamps: true
})
export default class ColorSchema extends Model<Color> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'id' })
  declare id: number

  @Column({ type: STRING, field: 'name_color' })
  declare nameColor: string

  @Column({ type: STRING, field: 'hex_color' })
  declare hexColor: string

  @Column({ type: STRING, field: 'status' })
  declare status: string
}
