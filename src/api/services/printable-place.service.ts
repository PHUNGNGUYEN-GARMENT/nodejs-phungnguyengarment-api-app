import PrintablePlaceSchema, { PrintablePlace } from '~/models/printable-place.model'
import logging from '~/utils/logging'

const NAMESPACE = 'PrintablePlace'
const PATH = 'services/printable-place'

export const createNew = async (item: PrintablePlace): Promise<PrintablePlaceSchema> => {
  try {
    const items = await PrintablePlaceSchema.findAll()
    return await PrintablePlaceSchema.create({ ...item, orderNumber: items.length })
  } catch (error) {
    logging.error(PATH, `Error creating new ${NAMESPACE} :: ${error}`)
    throw new Error(`Creating new ${NAMESPACE} :: ${error}`)
  }
}

// Get by id
export const getByPrintID = async (printID: number): Promise<PrintablePlaceSchema | null> => {
  try {
    const item = await PrintablePlaceSchema.findOne({ where: { printID: printID } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by printID :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by printID :: ${error}`)
  }
}

export const getByProductID = async (productID: number): Promise<PrintablePlaceSchema | null> => {
  try {
    const item = await PrintablePlaceSchema.findOne({ where: { productID: productID } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by productID :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by productID :: ${error}`)
  }
}

// Get all
export const getAll = async (): Promise<PrintablePlaceSchema[]> => {
  try {
    // if (item.printID) {
    //   return PrintablePlaceSchema.findAll({
    //     where: {
    //       printID: item.printID
    //     }
    //   })
    // }

    // if (item.productID) {
    //   return await PrintablePlaceSchema.findAll({
    //     where: {
    //       productID: item.productID
    //     }
    //   })
    // }
    return await PrintablePlaceSchema.findAll()
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

// Update by productID
export const updateByPrintID = async (item: PrintablePlace): Promise<number> => {
  try {
    const affectedRows = await PrintablePlaceSchema.update(
      {
        productID: item.productID,
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

export const updateByProductID = async (item: PrintablePlace): Promise<number> => {
  try {
    const affectedRows = await PrintablePlaceSchema.update(
      {
        printID: item.printID,
        name: item.name,
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

// Delete importedID
export const deleteByPrintID = async (printID: number): Promise<number> => {
  try {
    const affectedRows = await PrintablePlaceSchema.destroy({ where: { printID: printID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} printID :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by printID :: ${error}`)
  }
}

export const deleteByProductID = async (productID: number): Promise<number> => {
  try {
    const affectedRows = await PrintablePlaceSchema.destroy({ where: { productID: productID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} productID :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by productID :: ${error}`)
  }
}
