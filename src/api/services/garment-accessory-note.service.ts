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
export const getByID = async (accessoriesNoteID: number): Promise<GarmentAccessoryNoteSchema | null> => {
  try {
    const item = await GarmentAccessoryNoteSchema.findOne({ where: { accessoriesNoteID: accessoriesNoteID } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by accessoriesNoteID :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by accessoriesNoteID :: ${error}`)
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
        accessoriesNoteID: item.accessoriesNoteID,
        title: item.title,
        summary: item.summary,
        orderNumber: item.orderNumber
      },
      {
        where: {
          accessoriesNoteID: item.accessoriesNoteID
        }
      }
    )
    return affectedRows[0]
  } catch (error) {
    logging.error(NAMESPACE, `Error update ${NAMESPACE} by accessoriesNoteID :: ${error}`)
    throw new Error(`Update ${NAMESPACE} by accessoriesNoteID :: ${error}`)
  }
}

// Delete importedID
export const deleteByID = async (accessoriesNoteID: number): Promise<number> => {
  try {
    const affectedRows = await GarmentAccessoryNoteSchema.destroy({ where: { accessoriesNoteID: accessoriesNoteID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} accessoriesNoteID :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by accessoriesNoteID :: ${error}`)
  }
}
