import GroupSchema, { Group } from '~/models/group.model'
import logging from '~/utils/logging'

const NAMESPACE = 'Group'
const PATH = 'services/group'

export const createNew = async (item: Group): Promise<GroupSchema> => {
  try {
    const items = await GroupSchema.findAll()
    return await GroupSchema.create({ ...item, orderNumber: items.length })
  } catch (error) {
    logging.error(PATH, `Error creating new ${NAMESPACE} :: ${error}`)
    throw new Error(`Creating new ${NAMESPACE} :: ${error}`)
  }
}

// Get by id
export const getByID = async (groupID: number): Promise<GroupSchema | null> => {
  try {
    const item = await GroupSchema.findOne({ where: { groupID: groupID } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by groupID :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by groupID :: ${error}`)
  }
}

// Get all
export const getAll = async (): Promise<GroupSchema[]> => {
  try {
    const items = await GroupSchema.findAll()
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

// Update by productID
export const updateByID = async (item: Group): Promise<number> => {
  try {
    const affectedRows = await GroupSchema.update(
      {
        groupID: item.groupID,
        name: item.name,
        orderNumber: item.orderNumber
      },
      {
        where: {
          groupID: item.groupID
        }
      }
    )
    return affectedRows[0]
  } catch (error) {
    logging.error(NAMESPACE, `Error update ${NAMESPACE} by groupID :: ${error}`)
    throw new Error(`Update ${NAMESPACE} by groupID :: ${error}`)
  }
}

// Delete importedID
export const deleteByID = async (groupID: number): Promise<number> => {
  try {
    const affectedRows = await GroupSchema.destroy({ where: { groupID: groupID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} colorID :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by colorID :: ${error}`)
  }
}
