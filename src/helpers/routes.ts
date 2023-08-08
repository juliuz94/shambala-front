type Routes = {
  VIDEOS: string
  VIDEOS_BY_TAG: string
  VIDEO_LIKE: string
  COMMENT: string
  COMMENTS: string
  VIDEOS_WITH_PROGRESS: string
  VIDEO_PROGRESS: string
  WORKSHOP_PER_MONTH: string
  WORKSHOP: string
  POST: string
  POST_BY_ID: string,
  TAGS: string
  POST_COMMENT: string
  PIN_COMMENT: string
  STATISTICS: string
  LANDING_VIDEOS: string
  LANDING_WORKSHOP: string
  USERS: string
  ANNOUNCEMENT: string
  CATEGORY: string
  TERMS_ACCEPTANCE: string
  PLANS: string
  GENERATE_LINK: string
  SUBSCRIPTION: string
  NOTIFICATIONS: string,
  NOTIFICATIONS_BY_USER: string
}

const ROUTES: Routes = {
  VIDEOS: 'video',
  VIDEOS_BY_TAG: 'video/tags/paginate',
  VIDEO_LIKE: 'video/like',
  VIDEOS_WITH_PROGRESS: '/video/progress/user',
  VIDEO_PROGRESS: '/video/updateProgress',
  COMMENT: 'video/comment',
  COMMENTS: 'video/comments',
  WORKSHOP_PER_MONTH: '/workshop/peerMonth',
  WORKSHOP: '/workshop',
  POST: 'community/post',
  POST_BY_ID: '/community/post-by-id',
  TAGS: 'tags',
  POST_COMMENT: 'community/post/comment',
  PIN_COMMENT: 'community/pin-comment',
  STATISTICS: 'users/statistics',
  LANDING_VIDEOS: 'landing/videos',
  LANDING_WORKSHOP: 'landing/workshop',
  USERS: 'users',
  ANNOUNCEMENT: 'announcements',
  CATEGORY: 'category',
  TERMS_ACCEPTANCE: 'terms-acceptance',
  PLANS: 'plans',
  GENERATE_LINK: 'stripe/generateLink',
  SUBSCRIPTION: 'users/subscription',
  NOTIFICATIONS: 'notifications',
  NOTIFICATIONS_BY_USER: 'notifications/by-user'
}

export default ROUTES
