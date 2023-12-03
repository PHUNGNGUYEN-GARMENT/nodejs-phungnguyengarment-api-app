export type ItemStatusType = 'draft' | 'active' | 'closed' | 'archived' | 'deleted'

export type RequestBodyType = {
  filter: {
    status: ItemStatusType
    items: number[] // items: mảng id : default -1: Lấy tất cả post
  }
  paginator: {
    page: number // trang hiện tại : default = 1
    pageSize: number // số lượng post cần lấy : default = 10
  }
  searchTerm: string // searchTerm: chỉ lấy những product có productCode chứa từ được truyền vào.
  sorting: {
    column: string // id
    direction: 'asc' | 'desc' // direction: asc|desc sắp xếp trước sau
  }
}
