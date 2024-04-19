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
  path: string
}

export interface Legal{
  text: string
  _modified: number
  _mby: string
  _created: number
  _state: number
  _cby: string
  _id: string
}

export interface CMS_Page{
  title: string
  content: CMS_Page_Content
  _modified: number
  _mby: string
  _created: number
  _state: number
  _cby: string
  _id: string
}

export interface CMS_Page_Content{
  chapter: CMS_Page_Content_Chapter[]
}

export interface CMS_Page_Content_Chapter{
  title: string
  text: string
}

export interface Board{
  position: string
  name: string
  address: string
  landline: string
  mobile: string
  mail: string
  _modified: number
  _mby: string
  _created: number
  _state: number
  _cby: string
  _id: string
}

export interface LinkData{
  name: string
  url: string
  image: Medium
  category: string
  _modified: number
  _mby: string
  _created: number
  _state: number
  _cby: string
  _id: string
}

export interface Medium {
  path: string
  title: string
  mime: string
  type: string
  description: string
  tags: string[]
  size: number
  colors: string[]
  width: number
  height: number
  _hash: string
  _created: number
  _modified: number
  _cby: string
  folder: string
  _id: string
}

export interface Metadata{
  page: string;
  title: string;
  description: string;
  image: Medium,
  _modified: number;
  _mby: string;
  _created: number;
  _state: number;
  _cby: string;
  _id: string;
}