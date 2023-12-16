import { buildDynamicQuery } from '~/helpers/query'
import ColorSchema from '~/models/color.model'
import ProductColorSchema, { ProductColor } from '~/models/product-color.model'
import ProductSchema from '~/models/product.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'

const NAMESPACE = 'services/product-color'

export const createNewItem = async (item: ProductColor): Promise<ProductColorSchema> => {
  try {
    return await ProductColorSchema.create(
      { ...item },
      {
        include: [
          { model: ProductSchema, as: 'product' },
          { model: ColorSchema, as: 'color' }
        ]
      }
    )
  } catch (error) {
    logging.error(NAMESPACE, `Error createNewItem :: ${error}`)
    throw new Error(`${NAMESPACE} createNewItem :: ${error}`)
  }
}

// Get by id
export const getItemByPk = async (id: number): Promise<ProductColorSchema | null> => {
  try {
    const item = await ProductColorSchema.findByPk(id, {
      include: [
        { model: ProductSchema, as: 'product' },
        { model: ColorSchema, as: 'color' }
      ]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error getItemByPk :: ${error}`)
  }
}

// Get by id
export const getItemBy = async (product: ProductColor): Promise<ProductColorSchema | null> => {
  try {
    const item = await ProductColorSchema.findOne({
      where: { ...product },
      include: [
        { model: ProductSchema, as: 'product' },
        { model: ColorSchema, as: 'color' }
      ]
    })
    return item
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemBy :: ${error}`)
    throw new Error(`${NAMESPACE} getItemBy :: ${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: ProductColorSchema[] }> => {
  try {
    console.log(`${NAMESPACE}>>>`, buildDynamicQuery<ProductColor>(body))
    const items = await ProductColorSchema.findAndCountAll({
      offset: (Number(body.paginator.page) - 1) * Number(body.paginator.pageSize),
      limit: body.paginator.pageSize,
      order: [[body.sorting.column, body.sorting.direction]],
      where: buildDynamicQuery<ProductColor>(body),
      include: [
        { model: ProductSchema, as: 'product' },
        { model: ColorSchema, as: 'color' }
      ]
    })
    return items
  } catch (error) {
    logging.error(NAMESPACE, `Error getItems :: ${error}`)
    throw new Error(`${NAMESPACE} getItems :: ${error}`)
  }
}

export const getItemsWithStatus = async (status: ItemStatusType): Promise<ProductColorSchema[]> => {
  try {
    const items = await ProductColorSchema.findAll({
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
    return await ProductSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `Error getItemsCount :: ${error}`)
    throw new Error(`${NAMESPACE} getItemsCount :: ${error}`)
  }
}

// Update
export const updateItemByPk = async (
  id: number,
  itemToUpdate: ProductColor
): Promise<ProductColor | ProductColorSchema | ProductColorSchema[] | undefined> => {
  try {
    const updatedCount = await ProductColorSchema.update(
      {
        colorID: itemToUpdate.colorID,
        status: itemToUpdate.status
      },
      {
        where: {
          id: id
        },
        returning: true
      }
    )
    return updatedCount[0] > 0 ? itemToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error updateItemByPk :: ${error}`)
  }
}

export const updateItemByProductID = async (
  productID: number,
  itemToUpdate: ProductColor
): Promise<ProductColor | ProductColorSchema | ProductColorSchema[] | undefined> => {
  try {
    const updatedCount = await ProductColorSchema.update(
      {
        colorID: itemToUpdate.colorID,
        status: itemToUpdate.status
      },
      {
        where: {
          productID: productID
        }
      }
    )
    return updatedCount[0] > 0 ? itemToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateItemByProductID :: ${error}`)
    throw new Error(`${NAMESPACE} Error updateItemByProductID :: ${error}`)
  }
}

export const updateItemByColorID = async (
  colorID: number,
  itemToUpdate: ProductColor
): Promise<ProductColor | ProductColorSchema | ProductColorSchema[] | undefined> => {
  try {
    const updatedCount = await ProductColorSchema.update(
      {
        productID: itemToUpdate.productID,
        status: itemToUpdate.status
      },
      {
        where: {
          id: colorID
        }
      }
    )
    return updatedCount[0] > 0 ? itemToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error updateItemByColorID :: ${error}`)
    throw new Error(`${NAMESPACE} Error updateItemByColorID :: ${error}`)
  }
}

export const createOrUpdateItemByPk = async (
  id: number,
  item: ProductColor
): Promise<ProductColor | ProductColorSchema | ProductColorSchema[] | undefined> => {
  try {
    const getItem = await ProductColorSchema.findByPk(id)
    if (getItem) {
      const updatedCount = await ProductColorSchema.update(
        {
          colorID: item.colorID,
          productID: item.productID,
          status: item.status
        },
        {
          where: {
            id: id
          },
          returning: true
        }
      )
      return updatedCount[0] > 0 ? item : undefined
    } else {
      return await ProductColorSchema.create({ ...item })
    }
  } catch (error) {
    logging.error(NAMESPACE, `Error createOrUpdateItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error createOrUpdateItemByPk :: ${error}`)
  }
}

export const createOrUpdateItemByProductID = async (
  productID: number,
  item: ProductColor
): Promise<ProductColor | ProductColorSchema | undefined> => {
  try {
    const affectedRows = await ProductColorSchema.update(
      {
        colorID: item.colorID,
        status: item.status
      },
      {
        where: {
          productID: productID
        }
      }
    )
    if (affectedRows[0] > 0) {
      return item
    } else {
      return await ProductColorSchema.create({ ...item, productID: productID })
    }
  } catch (error) {
    logging.error(NAMESPACE, `Error createOrUpdateItemByProductID :: ${error}`)
    throw new Error(`${NAMESPACE} Error createOrUpdateItemByProductID :: ${error}`)
  }
}

// Delete
export const deleteItemByPk = async (id: number): Promise<number> => {
  try {
    const affectedRows = await ProductColorSchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemByPk :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteItemByPk :: ${error}`)
  }
}

export const deleteItemByColorID = async (colorID: number): Promise<number> => {
  try {
    const affectedRows = await ProductColorSchema.destroy({ where: { colorID: colorID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemByColorID :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteItemByColorID :: ${error}`)
  }
}

export const deleteItemByProductID = async (productID: number): Promise<number> => {
  try {
    return await ProductColorSchema.destroy({ where: { productID: productID } })
  } catch (error) {
    logging.error(NAMESPACE, `Error deleteItemByProductID :: ${error}`)
    throw new Error(`${NAMESPACE} Error deleteItemByProductID :: ${error}`)
  }
}
