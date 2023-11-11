import GarmentAccessorySchema, { GarmentAccessory } from '~/models/garment-accessory.model'
import logging from '~/utils/logging'

const NAMESPACE = 'ProductGroup'
const PATH = 'services/product-group'

export const createNew = async (item: GarmentAccessory): Promise<GarmentAccessorySchema> => {
  try {
    const items = await GarmentAccessorySchema.findAll()
    return await GarmentAccessorySchema.create({ ...item, orderNumber: items.length })
  } catch (error) {
    logging.error(PATH, `Error creating new ${NAMESPACE} :: ${error}`)
    throw new Error(`Creating new ${NAMESPACE} :: ${error}`)
  }
}

// Get by id
export const getByID = async (garmentAccessoryID: number): Promise<GarmentAccessorySchema | null> => {
  try {
    const item = await GarmentAccessorySchema.findOne({ where: { garmentAccessoryID: garmentAccessoryID } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by garmentAccessoryID :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by garmentAccessoryID :: ${error}`)
  }
}

export const getByProductID = async (productID: number): Promise<GarmentAccessorySchema | null> => {
  try {
    const item = await GarmentAccessorySchema.findOne({ where: { productID: productID } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by productID :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by productID :: ${error}`)
  }
}

// Get all
export const getAll = async (): Promise<GarmentAccessorySchema[]> => {
  try {
    const items = await GarmentAccessorySchema.findAll()
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

// Update by productID
export const updateByID = async (item: GarmentAccessory): Promise<number> => {
  try {
    const affectedRows = await GarmentAccessorySchema.update(
      {
        productID: item.productID,
        notesOther: item.notesOther,
        amountCuttingAccessory: item.amountCuttingAccessory,
        dateDeliveredChain: item.dateDeliveredChain,
        syncGarmentAccessoryState: item.syncGarmentAccessoryState,
        syncPackageAccessoryState: item.syncPackageAccessoryState,
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

// Delete groupID
export const deleteByID = async (garmentAccessoryID: number): Promise<number> => {
  try {
    const affectedRows = await GarmentAccessorySchema.destroy({ where: { garmentAccessoryID: garmentAccessoryID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} garmentAccessoryID :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by garmentAccessoryID :: ${error}`)
  }
}
