type Routes = {
  VIDEOS: string;
  VIDEOS_BY_TAG: string;
  COMMENT: string;
  COMMENTS: string;
};

const ROUTES: Routes = {
  VIDEOS: 'video',
  VIDEOS_BY_TAG: 'video/tags/paginate',
  COMMENT: 'video/comment',
  COMMENTS: 'video/comments'
};

export default ROUTES;