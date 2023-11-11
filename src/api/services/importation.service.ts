import ImportationSchema, { Importation } from '~/models/importation.model'
import logging from '~/utils/logging'

const NAMESPACE = 'Importation'
const PATH = 'services/importations'

export const createNew = async (item: Importation): Promise<ImportationSchema> => {
  try {
    const items = await ImportationSchema.findAll()
    return await ImportationSchema.create({ ...item, orderNumber: items.length })
  } catch (error) {
    logging.error(PATH, `Error creating new ${NAMESPACE} :: ${error}`)
    throw new Error(`Creating new product :: ${error}`)
  }
}

// Get by id
export const getByID = async (importedID: number): Promise<ImportationSchema | null> => {
  try {
    const item = await ImportationSchema.findOne({ where: { importedID: importedID } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by importedID :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by importedID :: ${error}`)
  }
}

export const getByProductID = async (productID: number): Promise<ImportationSchema | null> => {
  try {
    const item = await ImportationSchema.findOne({ where: { productID: productID } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by productID :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by productID :: ${error}`)
  }
}

// Get all
export const getAll = async (): Promise<ImportationSchema[]> => {
  try {
    const items = await ImportationSchema.findAll()
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

// Update by productID
export const updateByID = async (item: Importation): Promise<number> => {
  try {
    const affectedRows = await ImportationSchema.update(
      {
        productID: item.productID,
        dateImported: item.dateImported,
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

// Delete importedID
export const deleteByID = async (importedID: number): Promise<number> => {
  try {
    const affectedRows = await ImportationSchema.destroy({ where: { importedID: importedID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} importedID :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by importedID :: ${error}`)
  }
}
