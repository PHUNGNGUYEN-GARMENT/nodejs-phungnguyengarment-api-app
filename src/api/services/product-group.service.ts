import ProductGroupSchema, { ProductGroup } from '~/models/product-group.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'
import { buildDynamicQuery } from '../helpers/query'
import GroupSchema from '../models/group.model'
import ProductSchema from '../models/product.model'

const NAMESPACE = 'services/product-group'

export const createNewItem = async (item: ProductGroup): Promise<ProductGroupSchema> => {
  try {
    return await ProductGroupSchema.create(
      { ...item },
      {
        include: [
          { model: ProductSchema, as: 'product' },
          { model: GroupSchema, as: 'group' }
        ]
      }
    )
  } catch (error) {
    logging.error(NAMESPACE, `Error createNewItem :: ${error}`)
    throw new Error(`${NAMESPACE} Error createNewItem :: ${error}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<ProductGroupSchema | null> => {
  try {
    const item = await ProductGroupSchema.findByPk(id, {
      include: [
        { model: ProductSchema, as: 'product' },
        { model: GroupSchema, as: 'group' }
      ]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemByPk :: ${error}`)
  }
}

export const getItemBy = async (productGroup: ProductGroup): Promise<ProductGroupSchema | null> => {
  try {
    const item = await ProductGroupSchema.findOne({
      where: { ...productGroup },
      include: [
        { model: ProductSchema, as: 'product' },
        { model: GroupSchema, as: 'group' }
      ]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemBy :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemBy :: ${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: ProductGroupSchema[] }> => {
  try {
    console.log(buildDynamicQuery<ProductGroup>(body))
    const items = await ProductGroupSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<ProductGroup>(body),
      include: [
        { model: ProductSchema, as: 'product' },
        { model: GroupSchema, as: 'group' }
      ]
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error getItems :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItems :: ${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<ProductGroupSchema[]> => {
  try {
    const items = await ProductGroupSchema.findAll({
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
    return await ProductGroupSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemsCount :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemsCount :: ${error}`)
  }
}

// Update by productID
export const updateItemByPk = async (id: number, item: ProductGroup): Promise<ProductGroup | undefined> => {
  try {
    const affectedRows = await ProductGroupSchema.update(
      {
        ...item
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

export const updateItemByProductID = async (
  productID: number,
  item: ProductGroup
): Promise<ProductGroup | undefined> => {
  try {
    const affectedRows = await ProductGroupSchema.update(
      {
        ...item
      },
      {
        where: {
          productID: productID
        }
      }
    )
    return affectedRows[0] === 1 ? item : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateItemByProductID :: ${error}`)
    throw new Error(`${NAMESPACE} Error updateItemByProductID :: ${error}`)
  }
}

export const updateItemByGroupID = async (groupID: number, item: ProductGroup): Promise<ProductGroup | undefined> => {
  try {
    const affectedRows = await ProductGroupSchema.update(
      {
        ...item
      },
      {
        where: {
          groupID: groupID
        }
      }
    )
    return affectedRows[0] === 1 ? item : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateItemByGroupID :: ${error}`)
    throw new Error(`${NAMESPACE} Error updateItemByGroupID :: ${error}`)
  }
}

// Delete importedID
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    const affectedRows = await ProductGroupSchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteByPk :: ${error}`)
  }
}

export const deleteItemByProductID = async (productID: number): Promise<number> => {
  try {
    const affectedRows = await ProductGroupSchema.destroy({ where: { productID: productID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteByPk :: ${error}`)
  }
}

export const deleteItemByGroupID = async (groupID: number): Promise<number> => {
  try {
    const affectedRows = await ProductGroupSchema.destroy({ where: { groupID: groupID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteByPk :: ${error}`)
  }
}
