import ProductColorSchema, { ProductColor } from '~/models/product-color.model'
import logging from '~/utils/logging'

const NAMESPACE = 'ProductColor'
const PATH = 'services/product-color'

export const createNew = async (item: ProductColor): Promise<ProductColorSchema> => {
  try {
    const items = await ProductColorSchema.findAll()
    return await ProductColorSchema.create({ ...item, orderNumber: items.length })
  } catch (error) {
    logging.error(PATH, `Error creating new ${NAMESPACE} :: ${error}`)
    throw new Error(`Creating new ${NAMESPACE} :: ${error}`)
  }
}

// Get by id
export const getByColorID = async (colorID: number): Promise<ProductColorSchema | null> => {
  try {
    const item = await ProductColorSchema.findOne({ where: { colorID: colorID } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by colorID :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by colorID :: ${error}`)
  }
}

export const getByProductID = async (productID: number): Promise<ProductColorSchema | null> => {
  try {
    const item = await ProductColorSchema.findOne({ where: { productID: productID } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by productID :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by productID :: ${error}`)
  }
}

// Get all
export const getAll = async (): Promise<ProductColorSchema[]> => {
  try {
    const items = await ProductColorSchema.findAll()
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

// Update by productID
export const updateByColorID = async (item: ProductColor): Promise<number> => {
  try {
    const affectedRows = await ProductColorSchema.update(
      {
        nameColor: item.nameColor,
        rgbColor: item.rgbColor,
        hexColor: item.hexColor,
        cmykColor: item.cmykColor,
        hslColor: item.hslColor,
        hsvColor: item.hsvColor,
        orderNumber: item.orderNumber
      },
      {
        where: {
          colorID: item.colorID
        }
      }
    )
    return affectedRows[0]
  } catch (error) {
    logging.error(NAMESPACE, `Error update ${NAMESPACE} by colorID :: ${error}`)
    throw new Error(`Update ${NAMESPACE} by colorID :: ${error}`)
  }
}

export const updateByProductID = async (item: ProductColor): Promise<number> => {
  try {
    const affectedRows = await ProductColorSchema.update(
      {
        nameColor: item.nameColor,
        rgbColor: item.rgbColor,
        hexColor: item.hexColor,
        cmykColor: item.cmykColor,
        hslColor: item.hslColor,
        hsvColor: item.hsvColor,
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
export const deleteByColorID = async (colorID: number): Promise<number> => {
  try {
    const affectedRows = await ProductColorSchema.destroy({ where: { colorID: colorID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} colorID :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by colorID :: ${error}`)
  }
}

export const deleteByProductID = async (productID: number): Promise<number> => {
  try {
    const affectedRows = await ProductColorSchema.destroy({ where: { productID: productID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} productID :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by productID :: ${error}`)
  }
}
