import SewingLineDeliverySchema, { SewingLineDelivery } from '~/models/sewing-line-delivery.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'
import ProductSchema from '../models/product.model'
import SewingLineSchema from '../models/sewing-line.model'

const NAMESPACE = 'services/sewing-line-delivery'

export const createNewItem = async (item: SewingLineDelivery): Promise<SewingLineDeliverySchema> => {
  try {
    return await SewingLineDeliverySchema.create({ ...item })
  } catch (error) {
    logging.error(NAMESPACE, `Error createNewItem :: ${error}`)
    throw new Error(`${NAMESPACE} Error createNewItem :: ${error}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<SewingLineDeliverySchema | null> => {
  try {
    const item = await SewingLineDeliverySchema.findByPk(id, {
      include: [
        { model: SewingLineSchema, as: 'sewingLine' },
        { model: ProductSchema, as: 'product' }
      ]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemByPk :: ${error}`)
  }
}

export const getItemBy = async (sewingLineDelivery: SewingLineDelivery): Promise<SewingLineDeliverySchema | null> => {
  try {
    const item = await SewingLineDeliverySchema.findOne({
      where: { ...sewingLineDelivery },
      include: [
        { model: SewingLineSchema, as: 'sewingLine' },
        { model: ProductSchema, as: 'product' }
      ]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemBy :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemBy :: ${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: SewingLineDeliverySchema[] }> => {
  try {
    console.log(buildDynamicQuery<SewingLineDelivery>(body))
    const items = await SewingLineDeliverySchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<SewingLineDelivery>(body),
      include: [
        { model: SewingLineSchema, as: 'sewingLine' },
        { model: ProductSchema, as: 'product' }
      ]
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error getItems :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItems :: ${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<SewingLineDeliverySchema[]> => {
  try {
    const items = await SewingLineDeliverySchema.findAll({
      where: {
        status: status
      }
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemsWithStatus :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemsWithStatus :: ${error}`)
  }
}

export const getItemsCount = async (): Promise<number> => {
  try {
    return await SewingLineDeliverySchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemsCount :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemsCount :: ${error}`)
  }
}

// Update by productID
export const updateItemByPk = async (id: number, item: SewingLineDelivery): Promise<SewingLineDelivery | undefined> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.update(
      {
        productID: item.productID,
        quantityOrigin: item.quantityOrigin,
        quantitySewed: item.quantitySewed,
        expiredDate: item.expiredDate,
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

export const updateItemBySewingLineID = async (
  sewingLineID: number,
  item: SewingLineDelivery
): Promise<SewingLineDelivery | undefined> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.update(
      {
        productID: item.productID,
        quantityOrigin: item.quantityOrigin,
        quantitySewed: item.quantitySewed,
        expiredDate: item.expiredDate,
        status: item.status
      },
      {
        where: {
          sewingLineID: sewingLineID
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
  item: SewingLineDelivery
): Promise<SewingLineDelivery | undefined> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.update(
      {
        sewingLineID: item.sewingLineID,
        quantityOrigin: item.quantityOrigin,
        quantitySewed: item.quantitySewed,
        expiredDate: item.expiredDate,
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
    logging.error(NAMESPACE, `Error updateByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error updateByPk :: ${error}`)
  }
}

// Delete importedID
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteByPk :: ${error}`)
  }
}

export const deleteItemBySewingLineID = async (sewingLineID: number): Promise<number> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.destroy({ where: { sewingLineID: sewingLineID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemBySewingLineID :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteItemBySewingLineID :: ${error}`)
  }
}

export const deleteItemByProductID = async (productID: number): Promise<number> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.destroy({ where: { productID: productID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemByProductID :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteItemByProductID :: ${error}`)
  }
}
