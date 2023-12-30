export type ItemStatusType = 'draft' | 'active' | 'closed' | 'archived' | 'deleted'

export type NoteItemStatusType = 'lake' | 'enough' | 'arrived' | 'not_arrived'

export type RequestBodyType = {
  filter: {
    status: ItemStatusType
    field: string
    items: number[] // items: mảng id : default -1: Lấy tất cả post
  }
  paginator: {
    page: number // trang hiện tại : default = 1
    pageSize: number // số lượng post cần lấy : default = 10
  }
  search: {
    field: string
    term: string
  }
  sorting: {
    column: string // id
    direction: 'asc' | 'desc' // direction: asc|desc sắp xếp trước sau
  }
}
