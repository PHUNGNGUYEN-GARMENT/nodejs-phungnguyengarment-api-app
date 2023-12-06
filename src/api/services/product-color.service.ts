import { buildDynamicQuery } from '~/helpers/query'
import ColorSchema from '~/models/color.model'
import ProductColorSchema, { ProductColor } from '~/models/product-color.model'
import ProductSchema from '~/models/product.model'
import { ItemStatusType, RequestBodyType } from '~/type'
import logging from '~/utils/logging'

const NAMESPACE = 'ProductColor'
const PATH = 'services/product-color'

export const createNewItem = async (item: ProductColor): Promise<ProductColorSchema> => {
  try {
    const length = await ProductColorSchema.count()
    return await ProductColorSchema.create({ ...item, orderNumber: length })
  } catch (error) {
    logging.error(PATH, `Error creating new ${NAMESPACE} :: ${error}`)
    throw new Error(`Creating new :: ${error}`)
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
    logging.error(NAMESPACE, `Error get ${NAMESPACE} by id :: ${error}`)
    throw new Error(`Get ${NAMESPACE} by id :: ${error}`)
  }
}

// Get all
export const getItems = async (body: RequestBodyType): Promise<{ count: number; rows: ProductColorSchema[] }> => {
  try {
    console.log(buildDynamicQuery<ProductColor>(body))
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
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: 
    ${error}`)
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
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

export const getItemsCount = async (): Promise<number> => {
  try {
    return await ProductSchema.count()
  } catch (error) {
    logging.error(NAMESPACE, `Error get all ${NAMESPACE} :: ${error}`)
    throw new Error(`Get all ${NAMESPACE} :: ${error}`)
  }
}

// Update
export const updateItemByID = async (id: number, itemToUpdate: ProductColor): Promise<ProductColor | undefined> => {
  try {
    const affectedRows = await ProductColorSchema.update(
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
    logging.error(NAMESPACE, `Error update ${NAMESPACE} by id :: ${error}`)
    throw new Error(`Update ${NAMESPACE} by id :: ${error}`)
  }
}

export const updateItemByProductID = async (
  productID: number,
  itemToUpdate: ProductColor
): Promise<ProductColor | undefined> => {
  try {
    const affectedRows = await ProductColorSchema.update(
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
    logging.error(NAMESPACE, `Error update ${NAMESPACE} by id :: ${error}`)
    throw new Error(`Update ${NAMESPACE} by id :: ${error}`)
  }
}

export const updateItemByColorID = async (
  colorID: number,
  itemToUpdate: ProductColor
): Promise<ProductColor | undefined> => {
  try {
    const affectedRows = await ProductColorSchema.update(
      {
        ...itemToUpdate
      },
      {
        where: {
          colorID: colorID
        }
      }
    )
    return affectedRows[0] === 1 ? itemToUpdate : undefined
  } catch (error) {
    logging.error(NAMESPACE, `Error update ${NAMESPACE} by id :: ${error}`)
    throw new Error(`Update ${NAMESPACE} by id :: ${error}`)
  }
}

// Delete
export const deleteItemByID = async (id: number): Promise<number> => {
  try {
    const affectedRows = await ProductColorSchema.destroy({ where: { id: id } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} by id :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by id :: ${error}`)
  }
}

export const deleteItemByColorID = async (colorID: number): Promise<number> => {
  try {
    const affectedRows = await ProductColorSchema.destroy({ where: { colorID: colorID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} by colorID :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by colorID :: ${error}`)
  }
}

export const deleteItemByProductID = async (productID: number): Promise<number> => {
  try {
    const affectedRows = await ProductColorSchema.destroy({ where: { productID: productID } })
    return affectedRows
  } catch (error) {
    logging.error(NAMESPACE, `Error delete ${NAMESPACE} by productID :: ${error}`)
    throw new Error(`Delete ${NAMESPACE} by productID :: ${error}`)
  }
}
