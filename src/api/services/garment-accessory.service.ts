import GarmentAccessorySchema, { GarmentAccessory } from '~/models/garment-accessory.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'
import AccessoryNoteSchema from '../models/accessory-note.model'
import ProductSchema from '../models/product.model'

const NAMESPACE = 'services/garment-accessory'

export const createNewItem = async (item: GarmentAccessory): Promise<GarmentAccessorySchema> => {
  try {
    return await GarmentAccessorySchema.create({ ...item })
  } catch (error) {
    logging.error(NAMESPACE, `Error createNewItem :: ${error}`)
    throw new Error(`${NAMESPACE} createNewItem :: ${error}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<GarmentAccessorySchema | null> => {
  try {
    const item = await GarmentAccessorySchema.findByPk(id, {
      include: [
        { model: ProductSchema, as: 'product' },
        { model: AccessoryNoteSchema, as: 'accessoryNotes' }
      ]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemByPk :: ${error}`)
  }
}

// Get by id
export const getItemBy = async (data: GarmentAccessory): Promise<GarmentAccessorySchema | null> => {
  try {
    const item = await GarmentAccessorySchema.findOne({
      where: { ...data },
      include: [
        { model: ProductSchema, as: 'product' },
        { model: AccessoryNoteSchema, as: 'accessoryNotes' }
      ]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemBy :: ${error}`)
    throw new Error(`${NAMESPACE} getItemBy :: ${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: GarmentAccessorySchema[] }> => {
  try {
    // console.log(`${NAMESPACE}>>>`, buildDynamicQuery<ProductColor>(body))
    const items = await GarmentAccessorySchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<GarmentAccessory>(body),
      include: [
        { model: ProductSchema, as: 'product' },
        { model: AccessoryNoteSchema, as: 'accessoryNotes' }
      ]
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error getItems :: ${error}`)
    throw new Error(`${NAMESPACE} getItems :: ${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<GarmentAccessorySchema[]> => {
  try {
    const items = await GarmentAccessorySchema.findAll({
      where: {
        status: status
      },
      include: [
        { model: ProductSchema, as: 'product' },
        { model: AccessoryNoteSchema, as: 'accessoryNotes' }
      ]
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemsWithStatus :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemsWithStatus :: ${error}`)
  }
}

export const getItemsCount = async (): Promise<number> => {
  try {
    return await ProductSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemsCount :: ${error}`)
    throw new Error(`${NAMESPACE} getItemsCount :: ${error}`)
  }
}

// Update
export const updateItemByPk = async (
  id: number,
  itemToUpdate: GarmentAccessory
): Promise<GarmentAccessory | undefined> => {
  try {
    const affectedRows = await GarmentAccessorySchema.update(
      {
        ...itemToUpdate
      },
      {
        where: {
          id: id
        }
      }
    )
    return affectedRows[0] === 1 ? itemToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error updateItemByPk :: ${error}`)
  }
}

export const updateItemByProductID = async (
  productID: number,
  itemToUpdate: GarmentAccessory
): Promise<GarmentAccessory | undefined> => {
  try {
    const affectedRows = await GarmentAccessorySchema.update(
      {
        ...itemToUpdate
      },
      {
        where: {
          productID: productID
        }
      }
    )
    return affectedRows[0] === 1 ? itemToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateItemByProductID :: ${error}`)
    throw new Error(`${NAMESPACE} Error updateItemByProductID :: ${error}`)
  }
}

// Delete
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    const affectedRows = await GarmentAccessorySchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteItemByPk :: ${error}`)
  }
}

export const deleteItemByProductID = async (productID: number): Promise<number> => {
  try {
    return await GarmentAccessorySchema.destroy({ where: { productID: productID } })
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemByProductID :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteItemByProductID :: ${error}`)
  }
}
