import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript'
import { ItemStatusType } from '~/type'
import ProductSchema from './product.model'

const { INTEGER, STRING, DATE, FLOAT } = DataType

export type CuttingGroup = {
  id?: number
  productID?: number
  quantityRealCut?: number
  timeCut?: string
  dateSendEmbroidered?: string
  quantityArrivedEmbroidered?: string
  quantityDeliveredBTP?: string
  status?: ItemStatusType
}

@Table({
  modelName: 'CuttingGroup',
  tableName: 'cutting_groups',
  timestamps: true
})
export default class CuttingGroupSchema extends Model<CuttingGroup> {
  @Column({ type: INTEGER, primaryKey: true, autoIncrement: true, field: 'id' })
  declare id: number

  @Column({ type: INTEGER, field: 'product_id' })
  @ForeignKey(() => ProductSchema)
  declare productID: number

  @Column({ type: FLOAT, field: 'quantity_real_cut' })
  declare quantityRealCut: string

  @Column({ type: DATE, field: 'time_cut' })
  declare timeCut: string

  @Column({ type: DATE, field: 'date_send_embroidered' })
  declare dateSendEmbroidered: string

  @Column({ type: FLOAT, field: 'quantity_arrived_embroidered' })
  declare quantityArrivedEmbroidered: number

  @Column({ type: FLOAT, field: 'quantity_delivered_btp' })
  declare quantityDeliveredBTP: number

  @Column({ type: STRING, field: 'status' })
  declare status: string

  @BelongsTo(() => ProductSchema)
  declare product: ProductSchema
}
