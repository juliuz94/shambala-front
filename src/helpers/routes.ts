type Routes = {
  VIDEOS: string;
  VIDEOS_BY_TAG: string;
  COMMENT: string;
  COMMENTS: string;
  VIDEOS_WITH_PROGRESS: string;
  VIDEO_PROGRESS: string;
  WORKSHOP_PER_MONTH: string;
  WORKSHOP: string;
  POST: string;
  TAGS: string;
  POST_COMMENT: string;
};

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
};

export default ROUTES
