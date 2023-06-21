export type User = {
  firstName: string | null
  lastName: string | null
  _id: string
  uid: string
  email: string
  emailWork: string | null
  nationalIdType: string | null
  nationalId: string | null
  bio: string | null
  image: string | null
  invitedBy: string | null
  company: string | null
  isVolunteer: boolean
  type: string | null
  createdAt: string
  updatedAt: string
  __v: number
} | null

export type Video = {
  _id: string
  title: string
  url: string
  description: string
  image: string
  company: null
  createBy: string
  score: number
  companyWhiteList: string[]
  companyBlackList: string[]
  tags: string[]
  attachments: Attachment[]
  sponsors: string[]
  sections: {
    _id: string
    title?: string
    time?: number
  }[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Comment {
  _id: string
  videoId: string
  user: User
  message: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface PaginatedComments {
  docs: Comment[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: null
  nextPage: null
}

export interface Attachment {
  title: string
  description: string
  link: boolean
  url: string
  size: string
  guide: boolean
  _id: string
}

interface ImageGalleryItem {
  title: string
  description: string
  link: boolean
  url: string
  size: string
  guide: boolean
  _id: string
}

export interface Tag {
  _id: string
  es: string
  en: string
  createdAt: string
  updatedAt: string
  __v: number
}

interface Sponsor {
  _id: string
  title: string
  image: string
  nit: string
  permissions: string[]
  owner: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface Workshop {
  _id: string
  title: string
  image: string
  imageGallery: ImageGalleryItem[]
  description: string
  location: string
  isVirtual: boolean
  coordinates: null | object
  maxUsers: number
  subscribedUsers: any[] // Update the type of subscribedUsers if possible
  companyWhiteList: string[]
  companyBlackList: string[]
  tags: Tag[]
  attachments: Attachment[]
  sponsors: Sponsor[]
  type: string
  speaker: any[] // Update the type of speaker if possible
  date: string
  isPublic: boolean
  agenda: any[] // Update the type of agenda if possible
  createdAt: string
  updatedAt: string
  __v: number
  isLandingPage: boolean
  speakers: any[] // Update the type of speakers if possible
}

export interface AuthStoreType {
  user: User
  setUser: (data: any) => void
  handleLogin: (user: User) => void
  logOut(): void
}

export type SubscribedUser = {
  _id: string
  uid: string
  email: string
  emailWork: null | string
  nationalIdType: string
  nationalId: string
  bio: string
  image: null | string
  invitedBy: null | string
  company: string
  isVolunteer: boolean
  type: string
  createdAt: string
  updatedAt: string
  __v: number
  firstName: string
  lastName: string
  vulnerable: boolean
}

export type Company = {
  _id: string
  title: string
  image: string
  nit: string
  permissions: string[]
  owner: string
  createdAt: string
  updatedAt: string
  __v: number
}

export type Agenda = {
  time: string
  title: string
  place: string
  _id: string
}

export type Related = {
  _id: string
  title: string
  image: string
  imageGallery: ImageGalleryItem[]
  description: string
  location: string
  isVirtual: boolean
  coordinates: null
  maxUsers: number
  subscribedUsers: SubscribedUser[]
  companyWhiteList: Company[]
  companyBlackList: Company[]
  tags: Tag[]
  attachments: Attachment[]
  sponsors: any[]
  type: string
  speaker: any[]
  date: string
  agenda: Agenda[]
  createdAt: string
  updatedAt: string
  __v: number
  isLandingPage: boolean
  isPublic: boolean
  speakers: any[]
  like: any[]
} | null
