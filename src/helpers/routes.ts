type Routes = {
  VIDEOS: string
  VIDEOS_BY_TAG: string
  COMMENT: string
  COMMENTS: string
  VIDEOS_WITH_PROGRESS: string
  VIDEO_PROGRESS: string
  WORKSHOP_PER_MONTH: string
  WORKSHOP: string
  POST: string
  TAGS: string
  POST_COMMENT: string
  STATISTICS: string
  LANDING_VIDEOS: string
  LANDING_WORKSHOP: string
  USERS: string
  ANNOUNCEMENT: string
  CATEGORY: string
}

const ROUTES: Routes = {
  VIDEOS: 'video',
  VIDEOS_BY_TAG: 'video/tags/paginate',
  VIDEOS_WITH_PROGRESS: '/video/progress/user',
  VIDEO_PROGRESS: '/video/updateProgress',
  COMMENT: 'video/comment',
  COMMENTS: 'video/comments',
  WORKSHOP_PER_MONTH: '/workshop/peerMonth',
  WORKSHOP: '/workshop',
  POST: 'community/post',
  TAGS: 'tags',
  POST_COMMENT: 'community/post/comment',
  STATISTICS: 'users/statistics',
  LANDING_VIDEOS: 'landing/videos',
  LANDING_WORKSHOP: 'landing/workshop',
  USERS: 'users',
  ANNOUNCEMENT: 'announcements',
  CATEGORY: 'category',
}

export default ROUTES
