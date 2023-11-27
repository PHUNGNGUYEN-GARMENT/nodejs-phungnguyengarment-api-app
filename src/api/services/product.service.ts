import ProductSchema, { Product } from '~/models/product.model'
import logging from '~/utils/logging'

const NAMESPACE = 'Product'
const PATH = 'services/products'

export const createNew = async (item: Product): Promise<ProductSchema> => {
  try {
    const items = await ProductSchema.findAll()
    return await ProductSchema.create({ ...item, orderNumber: items.length })
  } catch (error) {
    logging.error(PATH, `Error creating new ${NAMESPACE} :: ${error}`)
    throw new Error(`Creating new product :: ${error}`)
  }
}

// Get by id
export const getByID = async (id: number): Promise<ProductSchema | null> => {
  try {
    const item = await ProductSchema.findOne({ where: { id: id } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by id :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by id :: ${error}`)
  }
}

// Get all
export const getAll = async (pageSize: number, offset: number): Promise<{ count: number; rows: ProductSchema[] }> => {
  try {
    const items = await ProductSchema.findAndCountAll({
      offset: offset,
      limit: pageSize
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

export const getTotalCount = async (): Promise<number> => {
  try {
    return await ProductSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

// Update
export const updateByID = async (item: Product): Promise<number> => {
  try {
    const affectedRows = await ProductSchema.update(
      {
        productCode: item.productCode,
        quantityPO: item.quantityPO,
        dateInputNPL: item.dateInputNPL,
        dateOutputFCR: item.dateOutputFCR,
        orderNumber: item.orderNumber
      },
      {
        where: {
          id: item.id
        }
      }
    )
    return affectedRows[0]
  } catch (error) {
    logging.error(NAMESPACE, `Error update ${NAMESPACE} by id :: ${error}`)
    throw new Error(`Update ${NAMESPACE} by id :: ${error}`)
  }
}

// Delete
export const deleteByID = async (id: number): Promise<number> => {
  try {
    const affectedRows = await ProductSchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} by id :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by id :: ${error}`)
  }
}
