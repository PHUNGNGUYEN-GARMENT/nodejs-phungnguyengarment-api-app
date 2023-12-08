import SampleSewingSchema, { SampleSewing } from '~/models/sample-sewing.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'
import ProductSchema from '../models/product.model'

const NAMESPACE = 'services/sample-sewing'

export const createNewItem = async (item: SampleSewing): Promise<SampleSewingSchema> => {
  try {
    return await SampleSewingSchema.create({ ...item })
  } catch (error) {
    logging.error(NAMESPACE, `Error createNewItem :: ${error}`)
    throw new Error(`${NAMESPACE} Error createNewItem :: ${error}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<SampleSewingSchema | null> => {
  try {
    const item = await SampleSewingSchema.findByPk(id, { include: [{ model: ProductSchema, as: 'product' }] })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemByPk :: ${error}`)
  }
}

export const getItemBy = async (data: SampleSewing): Promise<SampleSewingSchema | null> => {
  try {
    const item = await SampleSewingSchema.findOne({
      where: { ...data },
      include: [{ model: ProductSchema, as: 'product' }]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemBy :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemBy :: ${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: SampleSewingSchema[] }> => {
  try {
    console.log(buildDynamicQuery<SampleSewing>(body))
    const items = await SampleSewingSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<SampleSewing>(body),
      include: [{ model: ProductSchema, as: 'product' }]
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error getItems :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItems :: ${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<SampleSewingSchema[]> => {
  try {
    const items = await SampleSewingSchema.findAll({
      where: {
        status: status
      },
      include: [{ model: ProductSchema, as: 'product' }]
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemsWithStatus :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemsWithStatus :: ${error}`)
  }
}

export const getItemsCount = async (): Promise<number> => {
  try {
    return await SampleSewingSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemsCount :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemsCount :: ${error}`)
  }
}

// Update by productID
export const updateItemByPk = async (id: number, item: SampleSewing): Promise<SampleSewing | undefined> => {
  try {
    const affectedRows = await SampleSewingSchema.update(
      {
        productID: item.productID,
        dateSends: item.dateSends,
        approvalDateSO: item.approvalDateSO,
        sampleSewingDate: item.sampleSewingDate,
        status: item.status
      },
      {
        where: {
          id: id
        }
      }
    )
    return affectedRows[0] === 1 ? item : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error updateByPk :: ${error}`)
  }
}

export const updateItemByProductID = async (
  productID: number,
  item: SampleSewing
): Promise<SampleSewing | undefined> => {
  try {
    const affectedRows = await SampleSewingSchema.update(
      {
        dateSends: item.dateSends,
        approvalDateSO: item.approvalDateSO,
        sampleSewingDate: item.sampleSewingDate,
        status: item.status
      },
      {
        where: {
          productID: productID
        }
      }
    )
    return affectedRows[0] === 1 ? item : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateItemByProductID :: ${error}`)
    throw new Error(`${NAMESPACE} Error updateItemByProductID :: ${error}`)
  }
}

// Delete importedID
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    const affectedRows = await SampleSewingSchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteByPk :: ${error}`)
  }
}

export const deleteItemByProductID = async (productID: number): Promise<number> => {
  try {
    const affectedRows = await SampleSewingSchema.destroy({ where: { productID: productID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemByProductID :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteItemByProductID :: ${error}`)
  }
}
