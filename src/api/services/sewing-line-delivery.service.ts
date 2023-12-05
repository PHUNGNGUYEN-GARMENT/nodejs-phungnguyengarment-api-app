import SewingLineDeliverySchema, { SewingLineDelivery } from '~/models/sewing-line-delivery.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'

const NAMESPACE = 'SewingLineDelivery'
const PATH = 'services/sewing-line-delivery'

export const createNew = async (item: SewingLineDelivery): Promise<SewingLineDeliverySchema> => {
  try {
    const length = await SewingLineDeliverySchema.count()
    return await SewingLineDeliverySchema.create({ ...item, orderNumber: length })
  } catch (error) {
    logging.error(PATH, `Error creating new ${NAMESPACE} :: ${error}`)
    throw new Error(`Creating new ${NAMESPACE} :: ${error}`)
  }
}

// Get by id
export const getItemBy = async (data: SewingLineDelivery): Promise<SewingLineDeliverySchema | null> => {
  try {
    const item = await SewingLineDeliverySchema.findOne({ where: { ...data } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by getItemBy :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by getItemBy :: ${error}`)
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
      where: buildDynamicQuery<SewingLineDelivery>(body)
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
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
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

export const getItemsCount = async (): Promise<number> => {
  try {
    return await SewingLineDeliverySchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

// Update by productID
export const updateByID = async (id: number, item: SewingLineDelivery): Promise<SewingLineDelivery | undefined> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.update(
      {
        name: item.name,
        status: item.status,
        orderNumber: item.orderNumber
      },
      {
        where: {
          id: id
        }
      }
    )
    return affectedRows[0] === 1 ? item : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error update ${NAMESPACE} by id :: ${error}`)
    throw new Error(`Update ${NAMESPACE} by id :: ${error}`)
  }
}

// Delete importedID
export const deleteByID = async (id: number): Promise<number> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} id :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by id :: ${error}`)
  }
}
