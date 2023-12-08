import NotionAccessorySchema, { NotionAccessory } from '~/api/models/accessory-note.model'
import logging from '~/utils/logging'

const NAMESPACE = 'Color'
const PATH = 'services/color'

export const createNew = async (item: NotionAccessory): Promise<NotionAccessorySchema> => {
  try {
    const items = await NotionAccessorySchema.findAll()
    return await NotionAccessorySchema.create({ ...item, orderNumber: items.length })
  } catch (error) {
    logging.error(PATH, `Error creating new ${NAMESPACE} :: ${error}`)
    throw new Error(`Creating new ${NAMESPACE} :: ${error}`)
  }
}

// Get by accessoryNoteID
export const getByAccessoryNoteID = async (accessoryNoteID: number): Promise<NotionAccessorySchema | null> => {
  try {
    const item = await NotionAccessorySchema.findOne({ where: { accessoryNoteID: accessoryNoteID } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by accessoryNoteID :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by accessoryNoteID :: ${error}`)
  }
}

export const getByGarmentAccessoryID = async (garmentAccessoryID: number): Promise<NotionAccessorySchema | null> => {
  try {
    const item = await NotionAccessorySchema.findOne({ where: { garmentAccessoryID: garmentAccessoryID } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by garmentAccessoryID :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by garmentAccessoryID :: ${error}`)
  }
}

// Get all
export const getAll = async (): Promise<NotionAccessorySchema[]> => {
  try {
    const items = await NotionAccessorySchema.findAll()
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

// Update by productID
export const updateByAccessoryNoteID = async (item: NotionAccessory): Promise<number> => {
  try {
    const affectedRows = await NotionAccessorySchema.update(
      {
        garmentAccessoryID: item.garmentAccessoryID,
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

// Update by productID
export const updateByGarmentAccessoryID = async (item: NotionAccessory): Promise<number> => {
  try {
    const affectedRows = await NotionAccessorySchema.update(
      {
        accessoryNoteID: item.accessoryNoteID,
        orderNumber: item.orderNumber
      },
      {
        where: {
          garmentAccessoryID: item.garmentAccessoryID
        }
      }
    )
    return affectedRows[0]
  } catch (error) {
    logging.error(NAMESPACE, `Error update ${NAMESPACE} by garmentAccessoryID :: ${error}`)
    throw new Error(`Update ${NAMESPACE} by garmentAccessoryID :: ${error}`)
  }
}

// Delete importedID
export const deleteByAccessoryNoteID = async (accessoryNoteID: number): Promise<number> => {
  try {
    const affectedRows = await NotionAccessorySchema.destroy({ where: { accessoryNoteID: accessoryNoteID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} accessoryNoteID :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by accessoryNoteID :: ${error}`)
  }
}

export const deleteByGarmentAccessoryID = async (garmentAccessoryID: number): Promise<number> => {
  try {
    const affectedRows = await NotionAccessorySchema.destroy({ where: { garmentAccessoryID: garmentAccessoryID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} garmentAccessoryID :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by garmentAccessoryID :: ${error}`)
  }
}
