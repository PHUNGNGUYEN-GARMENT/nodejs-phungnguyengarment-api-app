import AccessoryNoteSchema, { AccessoryNote } from '~/models/accessory-note.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'
import * as garmentAccessoryNoteService from '../services/garment-accessory-note.service'

const NAMESPACE = 'services/accessory-note'

export const createNewItem = async (item: AccessoryNote): Promise<AccessoryNoteSchema> => {
  try {
    return await AccessoryNoteSchema.create({ ...item })
  } catch (error) {
    logging.error(NAMESPACE, `Error createNewItem :: ${error}`)
    throw new Error(`${NAMESPACE} Error createNewItem :: ${error}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<AccessoryNoteSchema | null> => {
  try {
    return await AccessoryNoteSchema.findByPk(id)
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemByPk :: ${error}`)
  }
}

export const getItemBy = async (data: AccessoryNote): Promise<AccessoryNoteSchema | null> => {
  try {
    return await AccessoryNoteSchema.findOne({ where: { ...data } })
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemBy :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemBy :: ${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: AccessoryNoteSchema[] }> => {
  try {
    console.log(buildDynamicQuery<AccessoryNote>(body))
    const items = await AccessoryNoteSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<AccessoryNote>(body)
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error getItems :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItems :: ${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<AccessoryNoteSchema[]> => {
  try {
    return await AccessoryNoteSchema.findAll({
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
    return await AccessoryNoteSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemsCount :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemsCount :: ${error}`)
  }
}

// Update by productID
export const updateItemByPk = async (id: number, itemToUpdate: AccessoryNote): Promise<AccessoryNote | undefined> => {
  try {
    const affectedRows = await AccessoryNoteSchema.update(
      {
        title: itemToUpdate.title,
        summary: itemToUpdate.summary,
        status: itemToUpdate.status
      },
      {
        where: {
          id: id
        }
      }
    )
    if (affectedRows[0] === 1) {
      const garmentAccessoryNoteUpdated = await garmentAccessoryNoteService.updateItemByAccessoryNoteID(id, {
        title: itemToUpdate.title,
        summary: itemToUpdate.summary
      })
      if (garmentAccessoryNoteUpdated) {
        return itemToUpdate
      }
    }
    return undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error updateByPk :: ${error}`)
  }
}

// Delete importedID
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    return await AccessoryNoteSchema.destroy({ where: { id: id } })
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteByPk :: ${error}`)
  }
}
