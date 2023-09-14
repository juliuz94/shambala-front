export type User = {
  tags: any
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
  community?: Community | null | undefined
  isVolunteer: boolean
  type: string | null
  createdAt: string
  stripe_id: string | null
  updatedAt: string
  __v: number
} | null

export type Community =  {
  companies: Company[]
  description: string,
  title: string,
  _id: string
}

export type Video = {
  progress: any
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
  speakers: Speaker[]
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
  likes: any
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
  like: any
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
  speaker?: any[] // Update the type of speaker if possible
  date: string
  isPublic: boolean
  agenda: any[] // Update the type of agenda if possible
  createdAt: string
  updatedAt: string
  __v: number
  isLandingPage: boolean
  speakers: any[] // Update the type of speakers if possible
  isPremium?: boolean
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

export interface CommentData {
  docs: DocComment[]
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

export interface Speaker {
  biography: string
  createdAt: string
  email: string
  image: string
  linkedin: string
  name: string
  updatedAt: string
  __v: number
  _id: string
}

export interface DocComment {
  _id: string
  message: string
  postId: string
  user: UserComment
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
  anchored: boolean
  __v: number
}

export interface UserComment {
  vulnerable: boolean
  _id: string
  uid: string
  email: string
  emailWork: null
  nationalIdType: null
  nationalId: null
  firstName: string
  lastName: string
  bio: null
  image: null
  invitedBy: null
  company: null
  isVolunteer: boolean
  type: null
  createdAt: Date
  updatedAt: Date
  __v: number
}

export interface Post {
  _id: string
  title: string
  text: string
  tags: Tag[]
  likes: any
  user: User
  isPublic: boolean
  category: string
  community: any
  createdAt: string
  updatedAt: string
  __v: number
  id: string
  comments: Comment[]
}

export interface PostsResponse {
  docs: Post[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: number | null
  nextPage: number | null
}

export type VideoProgress = {
  user: string
  progress: number
  finished: boolean
}

export type VideoProfile = {
  tags: any
  progress: VideoProgress
  _id: string
  title: string
  url: string
  image: string
  description: string
}

export interface WorkshopTag {
  _id: string
  es: string
  en: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface WorkshopSpeaker {
  _id: string
  name: string
  image: string
  email: string
  biography: string
  linkedin: string
  createdAt: string
  updatedAt: string
  __v: number
}

export interface WorkshopCoordinates {
  lng: number
  lat: number
  _id: string
}

export type NewVideoProfile = {
  progress: {
    user: string
    progress: number
    finished: boolean
  }
  _id: string
  title: string
  url: string
  image: string
  description: string
}

export interface LandWorkshop {
  _id: string
  title: string
  image: string
  imageGallery: any[]
  description: string
  location: string
  isVirtual: boolean
  coordinates: WorkshopCoordinates
  maxUsers: number
  subscribedUsers: any[]
  companyWhiteList: any[]
  companyBlackList: any[]
  tags: WorkshopTag[]
  attachments: any[]
  sponsors: any[]
  type: string
  speakers: WorkshopSpeaker[]
  date: string
  isPublic: boolean
  isLandingPage: boolean
  like: any[]
  agenda: any[]
  createdAt: string
  updatedAt: string
  __v: number
}

export interface DocPost {
  _id: string
  title: string
  text: string
  tags: Tag[]
  likes: any[]
  user: User
  commentsCount: number
  isPublic: boolean
  createdAt: string
  updatedAt: string
  category: string | undefined
  pin?: boolean
  __v: number
}

export interface TypePost {
  docs: DocPost[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
  pagingCounter: number
  hasPrevPage: boolean
  hasNextPage: boolean
  prevPage: any
  nextPage: any
}

export type Benefit = string

export type Pricing = {
  currency: string
  amount: number
  _id: string
}

export type Plan = {
  _id: string
  title: string
  benefits: Benefit[]
  pricing: Pricing
  recurrence: string
  createdAt: string
  updatedAt: string
  __v: number
}

export type Plans = Plan[]

export type Notification = {
  _id: string;
  title: string;
  user: string;
  user_dispatch: User;
  documentRef: string;
  read: boolean;
  notifyByEmail: boolean;
  event_type: string;
  document_data: any;
  createdAt: string;
  updatedAt: string;
  __v: number; 
}

export type LearningRoute = {
  createdAt: string;
  description: string;
  title: string;
  updatedAt: string;
  videos: Video[];
  workshops: Workshop[];
}

export type LearningPath = {
  createdAt: string;
  days: number;
  finishedRoute: boolean;
  progress: number;
  route: LearningRoute;
  startingDate: string;
  updatedAt: string;
  user: string;
  _id: string;
}

export type CompanyData = {
  createdAt: string
  description: string
  image: string
  nit: string
  owner: string
  permissions: string[]
  title: string
  videoUrl: string | null
  videoThumbnail: string | null
  _id: string
}