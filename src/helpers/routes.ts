type Routes = {
  VIDEOS: string;
  VIDEOS_BY_TAG: string;
  COMMENT: string;
  COMMENTS: string;
  VIDEOS_WITH_PROGRESS: string;
  VIDEO_PROGRESS: string;
};

const ROUTES: Routes = {
  VIDEOS: 'video',
  VIDEOS_BY_TAG: 'video/tags/paginate',
  VIDEOS_WITH_PROGRESS: '/video/progress/user',
  VIDEO_PROGRESS: '/video/updateProgress',
  COMMENT: 'video/comment',
  COMMENTS: 'video/comments'
};

export default ROUTES;