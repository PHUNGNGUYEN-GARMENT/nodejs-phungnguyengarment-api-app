import GarmentAccessoryNoteSchema, { GarmentAccessoryNote } from '~/models/garment-accessory-note.model'
import logging from '~/utils/logging'

const NAMESPACE = 'Color'
const PATH = 'services/color'

export const createNew = async (item: GarmentAccessoryNote): Promise<GarmentAccessoryNoteSchema> => {
  try {
    const items = await GarmentAccessoryNoteSchema.findAll()
    return await GarmentAccessoryNoteSchema.create({ ...item, orderNumber: items.length })
  } catch (error) {
    logging.error(PATH, `Error creating new ${NAMESPACE} :: ${error}`)
    throw new Error(`Creating new ${NAMESPACE} :: ${error}`)
  }
}

// Get by id
export const getByID = async (accessoryNoteID: number): Promise<GarmentAccessoryNoteSchema | null> => {
  try {
    const item = await GarmentAccessoryNoteSchema.findOne({ where: { accessoryNoteID: accessoryNoteID } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by accessoryNoteID :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by accessoryNoteID :: ${error}`)
  }
}

// Get all
export const getAll = async (): Promise<GarmentAccessoryNoteSchema[]> => {
  try {
    const items = await GarmentAccessoryNoteSchema.findAll()
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

// Update by productID
export const updateByID = async (item: GarmentAccessoryNote): Promise<number> => {
  try {
    const affectedRows = await GarmentAccessoryNoteSchema.update(
      {
        accessoryNoteID: item.accessoryNoteID,
        title: item.title,
        summary: item.summary,
        orderNumber: item.orderNumber
      },
      {
        where: {
          accessoryNoteID: item.accessoryNoteID
        }
      }
    )
    return affectedRows[0]
  } catch (error) {
    logging.error(NAMESPACE, `Error update ${NAMESPACE} by accessoryNoteID :: ${error}`)
    throw new Error(`Update ${NAMESPACE} by accessoryNoteID :: ${error}`)
  }
}

// Delete importedID
export const deleteByID = async (accessoryNoteID: number): Promise<number> => {
  try {
    const affectedRows = await GarmentAccessoryNoteSchema.destroy({ where: { accessoryNoteID: accessoryNoteID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} accessoryNoteID :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by accessoryNoteID :: ${error}`)
  }
}
