import SewingLineDeliverySchema, { SewingLineDelivery } from '~/models/sewing-line-delivery.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'
import ProductSchema from '../models/product.model'
import SewingLineSchema from '../models/sewing-line.model'

const NAMESPACE = 'services/sewing-line-delivery'

export const createNewItem = async (item: SewingLineDelivery): Promise<SewingLineDeliverySchema> => {
  try {
    return await SewingLineDeliverySchema.create({ ...item })
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const createNewItems = async (items: SewingLineDelivery[]): Promise<SewingLineDeliverySchema[]> => {
  try {
    return await SewingLineDeliverySchema.bulkCreate(items)
  } catch (error) {
    logging.error(NAMESPACE, `Error createNewItems :: ${error}`)
    throw new Error(`${NAMESPACE} createNewItems :: ${error}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<SewingLineDeliverySchema | null> => {
  try {
    const item = await SewingLineDeliverySchema.findByPk(id, {
      include: [
        { model: SewingLineSchema, as: 'sewingLine' },
        { model: ProductSchema, as: 'product' }
      ]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const getItemBy = async (sewingLineDelivery: SewingLineDelivery): Promise<SewingLineDeliverySchema | null> => {
  try {
    const item = await SewingLineDeliverySchema.findOne({
      where: { ...sewingLineDelivery },
      include: [
        { model: SewingLineSchema, as: 'sewingLine' },
        { model: ProductSchema, as: 'product' }
      ]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: SewingLineDeliverySchema[] }> => {
  try {
    const items = await SewingLineDeliverySchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize === -1 ? undefined : body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<SewingLineDelivery>(body),
      include: [
        { model: SewingLineSchema, as: 'sewingLine' },
        { model: ProductSchema, as: 'product' }
      ]
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<SewingLineDeliverySchema[]> => {
  try {
    const items = await SewingLineDeliverySchema.findAll({
      where: {
        status: status
      }
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const getItemsCount = async (): Promise<number> => {
  try {
    return await SewingLineDeliverySchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const updateItemsBy = async (
  query: { field: string; id: number },
  updatedRecords: SewingLineDelivery[]
): Promise<SewingLineDelivery[] | undefined | any> => {
  try {
    const existingRecords = await SewingLineDeliverySchema.findAll({
      where: {
        [query.field]: query.id
      }
    })

    // Tìm các bản ghi cần xoá
    const recordsToDelete = existingRecords.filter(
      (existingRecord) =>
        !updatedRecords.some((updatedRecord) => updatedRecord.sewingLineID === existingRecord.sewingLineID)
    )

    // Tìm các bản ghi cần thêm mới
    const recordsToAdd = updatedRecords.filter(
      (updatedRecord) =>
        // !existingRecords.some((existingRecord) => existingRecord.sewingLineID === updatedRecord.sewingLineID) &&
        // (updatedRecord.quantitySewed || updatedRecord.expiredDate)
        !existingRecords.some((existingRecord) => existingRecord.sewingLineID === updatedRecord.sewingLineID)
    )

    // Tìm các bản ghi cần update
    const recordsToUpdate = updatedRecords.filter((updatedRecord) =>
      existingRecords.some(
        (existingRecord) =>
          updatedRecord.sewingLineID === existingRecord.sewingLineID &&
          ((updatedRecord.quantitySewed && existingRecord.quantitySewed !== updatedRecord.quantitySewed) ||
            (updatedRecord.expiredDate && existingRecord.expiredDate !== updatedRecord.expiredDate) ||
            (updatedRecord.quantityOriginal && existingRecord.quantityOriginal !== updatedRecord.quantityOriginal))
      )
    )

    // Xoá các bản ghi không còn trong danh sách
    if (recordsToDelete.length > 0) {
      await SewingLineDeliverySchema.destroy({
        where: {
          sewingLineID: recordsToDelete.map((record) => record.sewingLineID)
        }
      })
    }

    // Thêm mới các bảng ghi mới
    if (recordsToAdd.length > 0) {
      await SewingLineDeliverySchema.bulkCreate(
        recordsToAdd.map((item) => {
          return { ...item, status: 'active' } as SewingLineDelivery
        })
      )
    }

    if (recordsToUpdate.length > 0) {
      for (const record of recordsToUpdate) {
        await SewingLineDeliverySchema.update(
          {
            ...record,
            status: record.status ?? 'active'
          },
          {
            where: {
              sewingLineID: record.sewingLineID
            }
          }
        )
      }
    }

    // Trả về danh sách cập nhật sau xử lý
    return [...recordsToUpdate, ...recordsToAdd]
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

// Update by productID
export const updateItemByPk = async (
  id: number,
  recordToUpdate: SewingLineDelivery
): Promise<SewingLineDelivery | undefined> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.update(
      {
        ...recordToUpdate
      },
      {
        where: {
          id: id
        }
      }
    )
    return affectedRows[0] > 0 ? recordToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const updateItemBySewingLineID = async (
  sewingLineID: number,
  recordToUpdate: SewingLineDelivery
): Promise<SewingLineDelivery | undefined> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.update(
      {
        ...recordToUpdate
      },
      {
        where: {
          sewingLineID: sewingLineID
        }
      }
    )
    return affectedRows[0] > 0 ? recordToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const updateItemByProductID = async (
  productID: number,
  recordToUpdate: SewingLineDelivery
): Promise<SewingLineDelivery | undefined> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.update(
      {
        ...recordToUpdate
      },
      {
        where: {
          productID: productID
        }
      }
    )
    return affectedRows[0] > 0 ? recordToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

// Delete importedID
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `${error}`)
    throw new Error(`${error}`)
  }
}

export const deleteItemBySewingLineID = async (sewingLineID: number): Promise<number> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.destroy({ where: { sewingLineID: sewingLineID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemBySewingLineID :: ${error}`)
    throw new Error(`deleteItemBySewingLineID :: ${error}`)
  }
}

export const deleteItemByProductID = async (productID: number): Promise<number> => {
  try {
    const affectedRows = await SewingLineDeliverySchema.destroy({ where: { productID: productID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemByProductID :: ${error}`)
    throw new Error(`deleteItemByProductID :: ${error}`)
  }
}
