import GroupSchema, { Group } from '~/models/group.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'

const NAMESPACE = 'Group'
const PATH = 'services/group'

export const createNew = async (item: Group): Promise<GroupSchema> => {
  try {
    const length = await GroupSchema.count()
    return await GroupSchema.create({ ...item, orderNumber: length })
  } catch (error) {
    logging.error(PATH, `Error creating new ${NAMESPACE} :: ${error}`)
    throw new Error(`Creating new ${NAMESPACE} :: ${error}`)
  }
}

// Get by id
export const getItemBy = async (group: Group): Promise<GroupSchema | null> => {
  try {
    const item = await GroupSchema.findOne({ where: { ...group } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by getItemBy :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by getItemBy :: ${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: GroupSchema[] }> => {
  try {
    console.log(buildDynamicQuery<Group>(body))
    const items = await GroupSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<Group>(body)
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<GroupSchema[]> => {
  try {
    const items = await GroupSchema.findAll({
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
    return await GroupSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

// Update by productID
export const updateByID = async (id: number, item: Group): Promise<Group | undefined> => {
  try {
    const affectedRows = await GroupSchema.update(
      {
        name: item.name,
        status: item.status,
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
    const affectedRows = await GroupSchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} id :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by id :: ${error}`)
  }
}
