import { BuildOptions, CreateOptions, FindOptions, Model, ModelType } from 'sequelize-typescript'
import logging from '~/utils/logging'

export class BaseRepository<T extends Model<T>> {
  private model: ModelType<T, T>

  constructor(model: ModelType<T, T>) {
    this.model = model
  }

  public async createNewItem(item: Partial<T>, options?: CreateOptions): Promise<T | undefined> {
    try {
      return await this.model.create(item, options)
    } catch (error) {
      this.handleServiceError('createNewItem', error)
    }
  }

  public async getItemById(id: number, options?: FindOptions): Promise<T | null> {
    try {
      return await this.model.findByPk(id, options)
    } catch (error) {
      this.handleServiceError('getItemById', error)
      return null
    }
  }

  public async getItemsByField(query: { field: string; value: any }, options?: FindOptions): Promise<T[] | null> {
    try {
      return await this.model.findAll({ where: { [query.field]: query.value }, ...options })
    } catch (error) {
      this.handleServiceError('getItemsByField', error)
      return null
    }
  }

  public async getAllItems(options?: FindOptions): Promise<T[] | null> {
    try {
      return await this.model.findAll(options)
    } catch (error) {
      this.handleServiceError('getAllItems', error)
      return null
    }
  }

  public async updateItemById(id: number, itemToUpdate: Partial<T>, options?: BuildOptions): Promise<T | null> {
    try {
      const [affectedRows] = await this.model.update(itemToUpdate, { where: { id }, ...options })
      return affectedRows > 0 ? (await this.getItemById(id)) || null : null
    } catch (error) {
      this.handleServiceError('updateItemById', error)
      return null
    }
  }

  public async deleteItemById(id: number, options?: BuildOptions): Promise<boolean> {
    try {
      const affectedRows = await this.model.destroy({ where: { id }, ...options })
      return affectedRows > 0
    } catch (error) {
      this.handleServiceError('deleteItemById', error)
      return false
    }
  }

  private handleServiceError(methodName: string, error: any): void {
    logging.error('services/base-repository', `Error ${methodName} :: ${error}`)
    throw new Error(`services/base-repository ${methodName} :: ${error}`)
  }
}

// Usage
const garmentAccessoryNoteRepository = new BaseRepository<GarmentAccessoryNoteSchema>(GarmentAccessoryNoteSchema)
const newItem = await garmentAccessoryNoteRepository.createNewItem({
  garmentAccessoryID: 1,
  accessoryNoteID: 2,
  status: 'active'
})

const getItem = await garmentAccessoryNoteRepository.getItemById(1)
const getItemsByField = await garmentAccessoryNoteRepository.getItemsByField({ field: 'status', value: 'active' })
const getAllItems = await garmentAccessoryNoteRepository.getAllItems()
const updatedItem = await garmentAccessoryNoteRepository.updateItemById(1, { status: 'updated' })
const isDeleted = await garmentAccessoryNoteRepository.deleteItemById(1)
