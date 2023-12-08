import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ItemStatusType } from '~/type'
import ProductSchema from './product.model'

const { INTEGER, STRING, DATE, ARRAY } = DataType

export type SampleSewing = {
  id?: number
  productID?: number
  sampleSewingDate?: string
  dateSends?: string[]
  approvalDateSO?: string
  status?: ItemStatusType
}

@Table({
  modelName: 'SampleSewing',
  tableName: 'sample-sewing',
  timestamps: true
})
export default class SampleSewingSchema extends Model<SampleSewing> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'id' })
  declare id: number

  @Column({ type: INTEGER, field: 'product_id' })
  @ForeignKey(() => ProductSchema)
  declare productID: string

  @Column({ type: DATE, field: 'sample_sewing_date' })
  declare sampleSewingDate: string

  @Column({ type: ARRAY, field: 'date_sends' })
  declare dateSends: string[]

  @Column({ type: DATE, field: 'approval_date_so' })
  declare approvalDateSO: string

  @Column({ type: STRING, field: 'status' })
  declare status: string
}
