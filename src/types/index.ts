interface User {
  firstName: string | null;
  lastName: string | null;
  _id: string;
  uid: string;
  email: string;
  emailWork: string | null;
  nationalIdType: string | null;
  nationalId: string | null;
  bio: string | null;
  image: string | null;
  invitedBy: string | null;
  company: string | null;
  isVolunteer: boolean;
  type: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type Video = {
  _id: string;
  title: string;
  url: string;
  description: string;
  image: string;
  company: null;
  createBy: string;
  score: number;
  companyWhiteList: string[];
  companyBlackList: string[];
  tags: string[];
  attachments: string[];
  sponsors: string[];
  sections: {
    _id: string;
    title?: string;
    time?: number;
  }[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface Comment {
  _id: string;
  videoId: string;
  user: User;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface PaginatedComments {
  docs: Comment[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null;
  nextPage: null;
}
