import ProductGroupSchema, { ProductGroup } from '~/models/product-group.model'
import logging from '~/utils/logging'

const NAMESPACE = 'ProductGroup'
const PATH = 'services/product-group'

export const createNew = async (item: ProductGroup): Promise<ProductGroupSchema> => {
  try {
    const items = await ProductGroupSchema.findAll()
    return await ProductGroupSchema.create({ ...item, orderNumber: items.length })
  } catch (error) {
    logging.error(PATH, `Error creating new ${NAMESPACE} :: ${error}`)
    throw new Error(`Creating new ${NAMESPACE} :: ${error}`)
  }
}

// Get by id
export const getByGroupID = async (groupID: number): Promise<ProductGroupSchema | null> => {
  try {
    const item = await ProductGroupSchema.findOne({ where: { groupID: groupID } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by groupID :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by groupID :: ${error}`)
  }
}

export const getByProductID = async (productID: number): Promise<ProductGroupSchema | null> => {
  try {
    const item = await ProductGroupSchema.findOne({ where: { productID: productID } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by productID :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by productID :: ${error}`)
  }
}

// Get all
export const getAll = async (): Promise<ProductGroupSchema[]> => {
  try {
    const items = await ProductGroupSchema.findAll()
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

// Update by productID
export const updateByGroupID = async (item: ProductGroup): Promise<number> => {
  try {
    const affectedRows = await ProductGroupSchema.update(
      {
        productID: item.productID,
        orderNumber: item.orderNumber
      },
      {
        where: {
          groupID: item.groupID
        }
      }
    )
    return affectedRows[0]
  } catch (error) {
    logging.error(NAMESPACE, `Error update ${NAMESPACE} by groupID :: ${error}`)
    throw new Error(`Update ${NAMESPACE} by groupID :: ${error}`)
  }
}

export const updateByProductID = async (item: ProductGroup): Promise<number> => {
  try {
    const affectedRows = await ProductGroupSchema.update(
      {
        groupID: item.groupID,
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
    logging.error(NAMESPACE, `Error update ${NAMESPACE} by productID :: ${error}`)
    throw new Error(`Update ${NAMESPACE} by productID :: ${error}`)
  }
}

// Delete groupID
export const deleteByGroupID = async (groupID: number): Promise<number> => {
  try {
    const affectedRows = await ProductGroupSchema.destroy({ where: { groupID: groupID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} groupID :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by groupID :: ${error}`)
  }
}

export const deleteByProductID = async (productID: number): Promise<number> => {
  try {
    const affectedRows = await ProductGroupSchema.destroy({ where: { productID: productID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} productID :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by productID :: ${error}`)
  }
}
