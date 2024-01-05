import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'
import CuttingGroupSchema, { CuttingGroup } from '../models/cutting-group.model'
import ProductSchema, { Product } from '../models/product.model'

const NAMESPACE = 'services/cutting-group'

export const createNewItem = async (item: CuttingGroup): Promise<CuttingGroupSchema> => {
  try {
    return await CuttingGroupSchema.create({ ...item })
  } catch (error) {
    logging.error(NAMESPACE, `Error createNewItem :: ${error}`)
    throw new Error(`${NAMESPACE} Error createNewItem :: ${error}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<CuttingGroupSchema | null> => {
  try {
    return await CuttingGroupSchema.findByPk(id, { include: [{ model: ProductSchema, as: 'product' }] })
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemByPk :: ${error}`)
  }
}

export const getItemBy = async (item: CuttingGroup): Promise<CuttingGroupSchema | null> => {
  try {
    return await CuttingGroupSchema.findOne({ where: { ...item }, include: [{ model: ProductSchema, as: 'product' }] })
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemBy :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemBy :: ${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: CuttingGroupSchema[] }> => {
  try {
    const items = await CuttingGroupSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<Product>(body),
      include: [{ model: ProductSchema, as: 'product' }]
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error getItems :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItems :: ${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<CuttingGroupSchema[]> => {
  try {
    return await CuttingGroupSchema.findAll({
      where: {
        status: status
      }
    })
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemsWithStatus :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemsWithStatus :: ${error}`)
  }
}

export const getItemsCount = async (): Promise<number> => {
  try {
    return await CuttingGroupSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemsCount :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemsCount :: ${error}`)
  }
}

// Update by productID
export const updateItemByProductID = async (
  productID: number,
  itemToUpdate: CuttingGroup
): Promise<CuttingGroup | undefined> => {
  try {
    const affectedRows = await CuttingGroupSchema.update(
      {
        ...itemToUpdate
      },
      {
        where: {
          productID: productID
        }
      }
    )
    return affectedRows[0] > 0 ? itemToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error updateByPk :: ${error}`)
  }
}

export const updateItemByPk = async (id: number, itemToUpdate: CuttingGroup): Promise<CuttingGroup | undefined> => {
  try {
    const affectedRows = await CuttingGroupSchema.update(
      {
        ...itemToUpdate
      },
      {
        where: {
          id: id
        }
      }
    )
    return affectedRows[0] > 0 ? itemToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error updateByPk :: ${error}`)
  }
}

// Delete importedID
export const deleteItemByProductID = async (productID: number): Promise<number> => {
  try {
    return await CuttingGroupSchema.destroy({ where: { productID: productID } })
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemByProductID :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteItemByProductID :: ${error}`)
  }
}

export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    return await CuttingGroupSchema.destroy({ where: { id: id } })
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteByPk :: ${error}`)
  }
}
