import GroupSchema, { Group } from '~/models/group.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'

const NAMESPACE = 'services/group'

export const createNewItem = async (item: Group): Promise<GroupSchema> => {
  try {
    return await GroupSchema.create({ ...item })
  } catch (error) {
    logging.error(NAMESPACE, `Error createNewItem :: ${error}`)
    throw new Error(`${NAMESPACE} Error createNewItem :: ${error}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<GroupSchema | null> => {
  try {
    return await GroupSchema.findByPk(id)
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemByPk :: ${error}`)
  }
}

export const getItemBy = async (item: Group): Promise<GroupSchema | null> => {
  try {
    return await GroupSchema.findOne({ where: { ...item } })
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemBy :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemBy :: ${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: GroupSchema[] }> => {
  try {
    console.log(buildDynamicQuery<Group>(body))
    const items = await GroupSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<Group>(body)
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error getItems :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItems :: ${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<GroupSchema[]> => {
  try {
    return await GroupSchema.findAll({
      where: {
        status: status
      }
    })
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemsWithStatus :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemsWithStatus :: ${error}`)
  }
}

export const getItemsCount = async (): Promise<number> => {
  try {
    return await GroupSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemsCount :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemsCount :: ${error}`)
  }
}

// Update by productID
export const updateItemByPk = async (id: number, item: Group): Promise<Group | undefined> => {
  try {
    const affectedRows = await GroupSchema.update(
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
    return affectedRows[0] > 0 ? item : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error updateByPk :: ${error}`)
  }
}

// Delete importedID
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    return await GroupSchema.destroy({ where: { id: id } })
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteByPk :: ${error}`)
  }
}
