import ImportationSchema, { Importation } from '~/models/importation.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'
import ProductSchema from '../models/product.model'

const NAMESPACE = 'Importation'
const PATH = 'services/importation'

export const createNew = async (item: Importation): Promise<ImportationSchema> => {
  try {
    const length = await ImportationSchema.count()
    return await ImportationSchema.create({ ...item, orderNumber: length })
  } catch (error) {
    logging.error(PATH, `Error creating new ${NAMESPACE} :: ${error}`)
    throw new Error(`Creating new ${NAMESPACE} :: ${error}`)
  }
}

// Get by id
export const getItemByFk = async (data: Importation): Promise<ImportationSchema | null> => {
  try {
    const item = await ImportationSchema.findOne({ where: { ...data } })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by getItemBy :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by getItemBy :: ${error}`)
  }
}

export const getItemByPk = async (id: number): Promise<ImportationSchema | null> => {
  try {
    const item = await ImportationSchema.findByPk(id, {
      include: [{ model: ProductSchema, as: 'product' }]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by getItemBy :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by getItemBy :: ${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: ImportationSchema[] }> => {
  try {
    console.log(buildDynamicQuery<Importation>(body))
    const items = await ImportationSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<Importation>(body),
      include: [{ model: ProductSchema, as: 'product' }]
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<ImportationSchema[]> => {
  try {
    const items = await ImportationSchema.findAll({
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
    return await ImportationSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

// Update by productID
export const updateByID = async (id: number, item: Importation): Promise<Importation | undefined> => {
  try {
    const affectedRows = await ImportationSchema.update(
      {
        dateImported: item.dateImported,
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
    const affectedRows = await ImportationSchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} id :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by id :: ${error}`)
  }
}
