import ProductSchema, { Product } from '~/models/product.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'

const NAMESPACE = 'services/products'

export const createNewItem = async (item: Product): Promise<ProductSchema> => {
  try {
    return await ProductSchema.create({ ...item })
  } catch (error) {
    logging.error(NAMESPACE, `Error createNewItem :: ${error}`)
    throw new Error(`${NAMESPACE} Error createNewItem :: ${error}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<ProductSchema | null> => {
  try {
    return await ProductSchema.findByPk(id)
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemByPk :: ${error}`)
  }
}

export const getItemBy = async (item: Product): Promise<ProductSchema | null> => {
  try {
    return await ProductSchema.findOne({
      where: { ...item }
    })
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemBy :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemBy :: ${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: ProductSchema[] }> => {
  try {
    const items = await ProductSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<Product>(body)
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error getItems :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItems :: ${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<ProductSchema[]> => {
  try {
    return await ProductSchema.findAll({
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
    return await ProductSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemsCount :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemsCount :: ${error}`)
  }
}

// Update
export const updateItemByPk = async (
  id: number,
  itemToUpdate: Product
): Promise<Product | ProductSchema[] | undefined> => {
  try {
    const updatedCount = await ProductSchema.update(
      {
        ...itemToUpdate
      },
      {
        where: {
          id: id
        }
      }
    )
    return updatedCount[0] > 0 ? itemToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error updateItemByPk :: ${error}`)
  }
}

// Delete
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    return await ProductSchema.destroy({ where: { id: id } })
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteItemByPk :: ${error}`)
  }
}
