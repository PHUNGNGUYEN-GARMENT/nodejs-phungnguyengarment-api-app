import ColorSchema, { Color } from '~/models/color.model'
import logging from '~/utils/logging'

const NAMESPACE = 'Color'
const PATH = 'services/color'

export const createNew = async (item: Color): Promise<ColorSchema> => {
  try {
    const items = await ColorSchema.findAll()
    return await ColorSchema.create({ ...item, orderNumber: items.length })
  } catch (error) {
    logging.error(PATH, `Error creating new ${NAMESPACE} :: ${error}`)
    throw new Error(`Creating new ${NAMESPACE} :: ${error}`)
  }
}

// Get by id
export const getByID = async (colorID: number): Promise<ColorSchema | null> => {
  try {
    const item = await ColorSchema.findOne({ where: { colorID: colorID } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by colorID :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by colorID :: ${error}`)
  }
}

// Get all
export const getAll = async (): Promise<ColorSchema[]> => {
  try {
    const items = await ColorSchema.findAll()
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

// Update by productID
export const updateByID = async (item: Color): Promise<number> => {
  try {
    const affectedRows = await ColorSchema.update(
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

// Delete importedID
export const deleteByID = async (colorID: number): Promise<number> => {
  try {
    const affectedRows = await ColorSchema.destroy({ where: { colorID: colorID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} colorID :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by colorID :: ${error}`)
  }
}
