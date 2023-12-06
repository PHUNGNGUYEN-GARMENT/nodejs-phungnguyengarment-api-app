import ColorSchema, { Color } from '~/models/color.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'

const NAMESPACE = 'Color'
const PATH = 'services/color'

export const createNew = async (item: Color): Promise<ColorSchema> => {
  try {
    const length = await ColorSchema.count()
    return await ColorSchema.create({ ...item, orderNumber: length })
  } catch (error) {
    logging.error(PATH, `Error creating new ${NAMESPACE} :: ${error}`)
    throw new Error(`Creating new ${NAMESPACE} :: ${error}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<ColorSchema | null> => {
  try {
    const item = await ColorSchema.findByPk(id)
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by color :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by color :: ${error}`)
  }
}

export const getItemBy = async (color: Color): Promise<ColorSchema | null> => {
  try {
    const item = await ColorSchema.findOne({ where: { ...color } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by color :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by color :: ${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: ColorSchema[] }> => {
  try {
    console.log(buildDynamicQuery<Color>(body))
    const items = await ColorSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<Color>(body)
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<ColorSchema[]> => {
  try {
    const items = await ColorSchema.findAll({
      where: {
        status: status
      }
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

export const getItemsCount = async (): Promise<number> => {
  try {
    return await ColorSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

// Update by productID
export const updateByID = async (id: number, item: Color): Promise<Color | undefined> => {
  try {
    const affectedRows = await ColorSchema.update(
      {
        nameColor: item.nameColor,
        hexColor: item.hexColor,
        status: item.status,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        orderNumber: item.orderNumber
      },
      {
        where: {
          id: id
        }
      }
    )
    return affectedRows[0] === 1 ? item : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error update ${NAMESPACE} by id :: ${error}`)
    throw new Error(`Update ${NAMESPACE} by id :: ${error}`)
  }
}

// Delete importedID
export const deleteByID = async (id: number): Promise<number> => {
  try {
    const affectedRows = await ColorSchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} id :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by id :: ${error}`)
  }
}
