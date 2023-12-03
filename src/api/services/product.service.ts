import { Op, WhereOptions } from 'sequelize'
import ProductSchema, { Product } from '~/models/product.model'
import { RequestBodyType } from '~/type'
import logging from '~/utils/logging'

const NAMESPACE = 'Product'
const PATH = 'services/products'

export const createNewItem = async (item: Product): Promise<ProductSchema> => {
  try {
    const items = await ProductSchema.findAll()
    return await ProductSchema.create({ ...item, orderNumber: items.length })
  } catch (error) {
    logging.error(PATH, `Error creating new ${NAMESPACE} :: ${error}`)
    throw new Error(`Creating new product :: ${error}`)
  }
}

// Get by id
export const getItemByID = async (product: Product): Promise<ProductSchema | null> => {
  try {
    const item = await ProductSchema.findOne({ where: { ...product } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by id :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by id :: ${error}`)
  }
}

// Get all
export const getItems = async (
  code: string,
  body: RequestBodyType
): Promise<{ count: number; rows: ProductSchema[] }> => {
  try {
    const queryData: WhereOptions<Product> | undefined = body.filter.items.includes(-1)
      ? {
          status: body.filter.status
        }
      : code.length > 0
      ? {
          status: body.filter.status,
          id: body.filter.items,
          productCode: code
        }
      : {
          status: body.filter.status,
          id: body.filter.items
        }
    const items = await ProductSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: queryData
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

export const getItemsCount = async (): Promise<number> => {
  try {
    return await ProductSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

// Update
export const updateItemByID = async (id: number, itemToUpdate: Product): Promise<Product | undefined> => {
  try {
    const affectedRows = await ProductSchema.update(
      {
        ...itemToUpdate
      },
      {
        where: {
          id: id
        }
      }
    )
    return affectedRows[0] === 1 ? itemToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error update ${NAMESPACE} by id :: ${error}`)
    throw new Error(`Update ${NAMESPACE} by id :: ${error}`)
  }
}

// Delete
export const deleteItemByID = async (id: number): Promise<number> => {
  try {
    const affectedRows = await ProductSchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} by id :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by id :: ${error}`)
  }
}
