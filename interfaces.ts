export interface GetFileResponse{
  result: string
  data: {temporary_url: string}
}

export interface FileResponse{
  result: string
  data: File[]
  items_per_page: number
  page: number
  response_at: number
}


export interface File{
  id: number
  name: string
  type: string
  status: null,
  visibility: string
  drive_id: number
  depth: number
  created_by: number
  created_at: null,
  added_at: number
  last_modified_at: number
  parent_id: number
  size: number
  has_thumbnail: true,
  has_onlyoffice: false,
  mime_type: string
  extension_type: string
  scan_status: string  
}