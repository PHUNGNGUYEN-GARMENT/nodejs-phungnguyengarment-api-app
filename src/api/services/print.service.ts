import PrintSchema, { Print } from '~/models/print.model'
import logging from '~/utils/logging'

const NAMESPACE = 'Print'
const PATH = 'services/print'

export const createNew = async (item: Print): Promise<PrintSchema> => {
  try {
    const items = await PrintSchema.findAll()
    return await PrintSchema.create({ ...item, orderNumber: items.length })
  } catch (error) {
    logging.error(PATH, `Error creating new ${NAMESPACE} :: ${error}`)
    throw new Error(`Creating new ${NAMESPACE} :: ${error}`)
  }
}

// Get by id
export const getByID = async (printID: number): Promise<PrintSchema | null> => {
  try {
    const item = await PrintSchema.findOne({ where: { printID: printID } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by printID :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by printID :: ${error}`)
  }
}

// Get all
export const getAll = async (): Promise<PrintSchema[]> => {
  try {
    const items = await PrintSchema.findAll()
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

// Update by productID
export const updateByID = async (item: Print): Promise<number> => {
  try {
    const affectedRows = await PrintSchema.update(
      {
        printID: item.printID,
        name: item.name,
        orderNumber: item.orderNumber
      },
      {
        where: {
          printID: item.printID
        }
      }
    )
    return affectedRows[0]
  } catch (error) {
    logging.error(NAMESPACE, `Error update ${NAMESPACE} by printID :: ${error}`)
    throw new Error(`Update ${NAMESPACE} by printID :: ${error}`)
  }
}

// Delete importedID
export const deleteByID = async (printID: number): Promise<number> => {
  try {
    const affectedRows = await PrintSchema.destroy({ where: { printID: printID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} printID :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by printID :: ${error}`)
  }
}
