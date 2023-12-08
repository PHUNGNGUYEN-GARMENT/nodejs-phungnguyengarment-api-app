import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { ItemStatusType } from '~/type'

const { INTEGER, STRING } = DataType

export type SewingLine = {
  id?: number
  sewingLineName?: string
  status?: ItemStatusType
}

@Table({
  modelName: 'SewingLine',
  tableName: 'sewing-line',
  timestamps: true
})
export default class SewingLineSchema extends Model<SewingLine> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'id' })
  declare id: number

  @Column({ type: STRING, field: 'sewing_line_name' })
  declare sewingLineName: string

  @Column({ type: STRING, field: 'status' })
  declare status: string
}
