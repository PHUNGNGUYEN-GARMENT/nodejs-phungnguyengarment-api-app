import ImportationSchema, { Importation } from '~/models/importation.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'
import ProductSchema from '../models/product.model'

const NAMESPACE = 'services/importation'

export const createNewItem = async (item: Importation): Promise<ImportationSchema> => {
  try {
    return await ImportationSchema.create({ ...item })
  } catch (error) {
    logging.error(NAMESPACE, `Error createNewItem :: ${error}`)
    throw new Error(`${NAMESPACE} Error createNewItem :: ${error}`)
  }
}

export const getItemByPk = async (id: number): Promise<ImportationSchema | null> => {
  try {
    const item = await ImportationSchema.findByPk(id, {
      include: [{ model: ProductSchema, as: 'product' }]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemByPk :: ${error}`)
  }
}

// Get by id
export const getItemByProductID = async (productID: number): Promise<ImportationSchema | null> => {
  try {
    const item = await ImportationSchema.findOne({
      where: { productID: productID },
      include: [{ model: ProductSchema, as: 'product' }]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemByProductID :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemByProductID :: ${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: ImportationSchema[] }> => {
  try {
    const items = await ImportationSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<Importation>(body),
      include: [{ model: ProductSchema, as: 'product' }]
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error getItems :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItems :: ${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<ImportationSchema[]> => {
  try {
    const items = await ImportationSchema.findAll({
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
    return await ImportationSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemsCount :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemsCount :: ${error}`)
  }
}

// Update by productID
export const updateItemByPk = async (id: number, item: Importation): Promise<Importation | undefined> => {
  try {
    const affectedRows = await ImportationSchema.update(
      {
        quantity: item.quantity,
        dateImported: item.dateImported,
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
    logging.error(NAMESPACE, `Error updateItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error updateItemByPk :: ${error}`)
  }
}

export const updateItemByProductID = async (productID: number, item: Importation): Promise<Importation | undefined> => {
  try {
    const affectedRows = await ImportationSchema.update(
      {
        quantity: item.quantity,
        dateImported: item.dateImported,
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
    logging.error(NAMESPACE, `Error updateByProductID :: ${error}`)
    throw new Error(`${NAMESPACE} Error updateByProductID :: ${error}`)
  }
}

export const createOrUpdateItemByPk = async (
  id: number,
  item: Importation
): Promise<Importation | ImportationSchema | undefined> => {
  try {
    const affectedRows = await ImportationSchema.update(
      {
        quantity: item.quantity,
        dateImported: item.dateImported,
        status: item.status
      },
      {
        where: {
          id: id
        }
      }
    )
    if (affectedRows[0] === 1) {
      return item
    } else {
      return await ImportationSchema.create({ ...item })
    }
  } catch (error) {
    logging.error(NAMESPACE, `Error updateByProductID :: ${error}`)
    throw new Error(`${NAMESPACE} Error updateByProductID :: ${error}`)
  }
}

export const createOrUpdateItemByProductID = async (
  productID: number,
  item: Importation
): Promise<Importation | ImportationSchema | undefined> => {
  try {
    const affectedRows = await ImportationSchema.update(
      {
        quantity: item.quantity,
        dateImported: item.dateImported,
        status: item.status
      },
      {
        where: {
          productID: productID
        }
      }
    )
    if (affectedRows[0] === 1) {
      return item
    } else {
      return await ImportationSchema.create({ ...item })
    }
  } catch (error) {
    logging.error(NAMESPACE, `Error updateByProductID :: ${error}`)
    throw new Error(`${NAMESPACE} Error updateByProductID :: ${error}`)
  }
}

// Delete importedID
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    const affectedRows = await ImportationSchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteItemByPk :: ${error}`)
  }
}

export const deleteItemByProductID = async (productID: number): Promise<number> => {
  try {
    const affectedRows = await ImportationSchema.destroy({ where: { productID: productID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteItemByPk :: ${error}`)
  }
}
