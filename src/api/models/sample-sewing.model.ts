import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ItemStatusType } from '~/type'
import ProductSchema from './product.model'

const { INTEGER, STRING, DATE } = DataType

export type SampleSewing = {
  id?: number
  productID?: number
  dateSubmissionNPL?: Date
  dateApprovalSO?: Date
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

  @Column({ type: DATE, field: 'date_submission_npl' })
  declare dateSubmissionNPL: Date

  @Column({ type: DATE, field: 'date_approval_so' })
  declare dateApprovalSO: Date

  @Column({ type: STRING, field: 'status' })
  declare status: string

  @BelongsTo(() => ProductSchema)
  declare product: ProductSchema
}
