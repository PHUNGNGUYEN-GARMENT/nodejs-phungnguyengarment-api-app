import PrintSchema, { Print } from '~/models/print.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'

const NAMESPACE = 'services/print'

export const createNewItem = async (item: Print): Promise<PrintSchema> => {
  try {
    return await PrintSchema.create({ ...item })
  } catch (error) {
    logging.error(NAMESPACE, `Error createNewItem :: ${error}`)
    throw new Error(`${NAMESPACE} Error createNewItem :: ${error}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<PrintSchema | null> => {
  try {
    const item = await PrintSchema.findByPk(id)
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemByPk :: ${error}`)
  }
}

export const getItemBy = async (data: Print): Promise<PrintSchema | null> => {
  try {
    const item = await PrintSchema.findOne({ where: { ...data } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemBy :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemBy :: ${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: PrintSchema[] }> => {
  try {
    console.log(buildDynamicQuery<Print>(body))
    const items = await PrintSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<Print>(body)
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error getItems :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItems :: ${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<PrintSchema[]> => {
  try {
    const items = await PrintSchema.findAll({
      where: {
        status: status
      }
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemsWithStatus :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemsWithStatus :: ${error}`)
  }
}

export const getItemsCount = async (): Promise<number> => {
  try {
    return await PrintSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemsCount :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemsCount :: ${error}`)
  }
}

// Update by productID
export const updateItemByPk = async (id: number, item: Print): Promise<Print | undefined> => {
  try {
    const affectedRows = await PrintSchema.update(
      {
        name: item.name,
        status: item.status
      },
      {
        where: {
          id: id
        }
      }
    )
    return affectedRows[0] === 1 ? item : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error updateByPk :: ${error}`)
  }
}

// Delete importedID
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    const affectedRows = await PrintSchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteByPk :: ${error}`)
  }
}
