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
    throw new Error(`Error creating new product :: ${error}`)
  }
}

// Get by id
export const getByID = async (id: number): Promise<ProductSchema | null> => {
  try {
    const item = await ProductSchema.findOne({ where: { productID: id } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by id :: ${error}`)
    throw new Error(`Error get ${NAMESPACE} by id :: ${error}`)
  }
}

// Get all
export const getAll = async (): Promise<ProductSchema[]> => {
  try {
    const items = await ProductSchema.findAll()
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Error get all ${NAMESPACE} :: ${error}`)
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
        dateOutPutFCR: item.dateOutPutFCR,
        placePrintIn: item.placePrintIn,
        orderNumber: item.orderNumber
      },
      {
        where: {
          productID: item.productID
        }
      }
    )
    return affectedRows[0]
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Error get all ${NAMESPACE} :: ${error}`)
  }
}

// Delete
export const deleteByID = async (id: number): Promise<number> => {
  try {
    const affectedRows = await ProductSchema.destroy({ where: { productID: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} by id :: ${error}`)
    throw new Error(`Error delete ${NAMESPACE} by id :: ${error}`)
  }
}
