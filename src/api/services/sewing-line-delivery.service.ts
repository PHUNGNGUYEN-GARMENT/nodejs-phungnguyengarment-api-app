import SewingLineDeliverySchema, { SewingLineDelivery } from '~/models/sewing-line-delivery.model'
import logging from '~/utils/logging'

const NAMESPACE = 'SewingLineDelivery'
const PATH = 'services/sewing-line-delivery'

export const createNew = async (item: SewingLineDelivery): Promise<SewingLineDeliverySchema> => {
  try {
    const items = await SewingLineDeliverySchema.findAll()
    return await SewingLineDeliverySchema.create({ ...item, orderNumber: items.length })
  } catch (error) {
    logging.error(PATH, `Error creating new ${NAMESPACE} :: ${error}`)
    throw new Error(`Creating new ${NAMESPACE} :: ${error}`)
  }
}

// Get by id
export const getByID = async (sewingLineDeliveryID: number): Promise<SewingLineDeliverySchema | null> => {
  try {
    const item = await SewingLineDeliverySchema.findOne({ where: { sewingLineDeliveryID: sewingLineDeliveryID } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by sewingLineDeliveryID :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by sewingLineDeliveryID :: ${error}`)
  }
}

// Get all
export const getAll = async (): Promise<SewingLineDeliverySchema[]> => {
  try {
    const items = await SewingLineDeliverySchema.findAll()
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

// Update by productID
export const updateByID = async (item: SewingLineDelivery): Promise<number> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.update(
      {
        sewingLineDeliveryID: item.sewingLineDeliveryID,
        sewingLine: item.sewingLine,
        orderNumber: item.orderNumber
      },
      {
        where: {
          sewingLineDeliveryID: item.sewingLineDeliveryID
        }
      }
    )
    return affectedRows[0]
  } catch (error) {
    logging.error(NAMESPACE, `Error update ${NAMESPACE} by sewingLineDeliveryID :: ${error}`)
    throw new Error(`Update ${NAMESPACE} by sewingLineDeliveryID :: ${error}`)
  }
}

// Delete importedID
export const deleteByID = async (sewingLineDeliveryID: number): Promise<number> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.destroy({
      where: { sewingLineDeliveryID: sewingLineDeliveryID }
    })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} sewingLineDeliveryID :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by sewingLineDeliveryID :: ${error}`)
  }
}
