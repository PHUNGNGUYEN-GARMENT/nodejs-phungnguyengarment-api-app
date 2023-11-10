import ImportedLotSchema, { ImportedLot } from '~/models/imported-lot.model'
import logging from '~/utils/logging'

const NAMESPACE = 'ImportedLot'
const PATH = 'services/imported-lot'

export const createNew = async (item: ImportedLot): Promise<ImportedLotSchema> => {
  try {
    const items = await ImportedLotSchema.findAll()
    return await ImportedLotSchema.create({ ...item, orderNumber: items.length })
  } catch (error) {
    logging.error(PATH, `Error creating new ${NAMESPACE} :: ${error}`)
    throw new Error(`Creating new product :: ${error}`)
  }
}

// Get by id
export const getByProductID = async (productID: number): Promise<ImportedLotSchema | null> => {
  try {
    const item = await ImportedLotSchema.findOne({ where: { productID: productID } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by productID :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by productID :: ${error}`)
  }
}

export const getByImportedID = async (importedID: number): Promise<ImportedLotSchema | null> => {
  try {
    const item = await ImportedLotSchema.findOne({ where: { importedID: importedID } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by importedID :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by importedID :: ${error}`)
  }
}

// Get all
export const getAll = async (): Promise<ImportedLotSchema[]> => {
  try {
    const items = await ImportedLotSchema.findAll()
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

// Update by productID
export const updateByProductID = async (item: ImportedLot): Promise<number> => {
  try {
    const affectedRows = await ImportedLotSchema.update(
      {
        quantity: item.quantity,
        unit: item.unit,
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

// Update by productID
export const updateByImportedID = async (item: ImportedLot): Promise<number> => {
  try {
    const affectedRows = await ImportedLotSchema.update(
      {
        quantity: item.quantity,
        unit: item.unit,
        orderNumber: item.orderNumber
      },
      {
        where: {
          importedID: item.importedID
        }
      }
    )
    return affectedRows[0]
  } catch (error) {
    logging.error(NAMESPACE, `Error update ${NAMESPACE} by importedID :: ${error}`)
    throw new Error(`Update ${NAMESPACE} by importedID :: ${error}`)
  }
}

// Delete by productID
export const deleteByProductID = async (productID: number): Promise<number> => {
  try {
    const affectedRows = await ImportedLotSchema.destroy({ where: { productID: productID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} productID :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} productID :: ${error}`)
  }
}

// Delete importedID
export const deleteByImportedID = async (importedID: number): Promise<number> => {
  try {
    const affectedRows = await ImportedLotSchema.destroy({ where: { importedID: importedID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} importedID :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by importedID :: ${error}`)
  }
}
