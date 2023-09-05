import { Notification, User } from "@/types"

const enum NOTIFICATION_EVENTS {
  /* Comentarios */
  COMMENT_CREATE = "comment.create", //Evento que se dispara cuando se crea un comentario de un post
  COMMENT_LIKE = "comment.liked", //Evento que se dispara cuando se le da like a un comentario de un post
  /* Post */
  POST_LIKED = "post.liked",
  /* Video */
  VIDEO_CREATE = "video.created", //Evento que se dispara cuando shambala crea un video
  VIDEO_COMMENT_LIKED = "video.comment.liked", //Evento que se dispara cuando se le da liked a un comentario que el usuario sigue
  VIDEO_COMMENT = "video.comment", //Evento que se dispara cuando se agrega un comentario sobre el video que ya tiene un comentario de el usuario
  /* Workshop */
  WORKSHOP_CREATE = "workshop.created",
  /* Announcements */
  ANNOUNCEMENTS_CREATE = "announcements.created",
}

export const getNotificationMessage = (notification: Notification) => {
  switch (notification.event_type) {
    case NOTIFICATION_EVENTS.COMMENT_CREATE:
      return `${notification.user_dispatch?.firstName} ${notification.user_dispatch?.lastName ? notification.user_dispatch?.lastName : ''} 
      ha comentado sobre el post "${notification.document_data.title}"`

    case NOTIFICATION_EVENTS.COMMENT_LIKE:
      return `${notification.user_dispatch?.firstName} ${notification.user_dispatch?.lastName ? notification.user_dispatch?.lastName : ''} 
      le dio like a tu comentario en el post "${notification.document_data.title}"`

    case NOTIFICATION_EVENTS.POST_LIKED:
      return `${notification.user_dispatch?.firstName} ${notification.user_dispatch?.lastName ? notification.user_dispatch?.lastName : ''} 
      le dio like a tu post "${notification.document_data.title}"`

    case NOTIFICATION_EVENTS.VIDEO_CREATE:
      return `Hay un nuevo que te puede interesar: "${notification.document_data.title}"`

    case NOTIFICATION_EVENTS.VIDEO_COMMENT_LIKED:
      return `${notification.user_dispatch?.firstName} ${notification.user_dispatch?.lastName ? notification.user_dispatch?.lastName : ''} 
      le dio like a tu comentario en el video "${notification.document_data.title}"`

    case NOTIFICATION_EVENTS.VIDEO_COMMENT:
      return `${notification.user_dispatch?.firstName} ${notification.user_dispatch?.lastName ? notification.user_dispatch?.lastName : ''} 
      añadió un comentario sobre un video que también comentaste: "${notification.document_data.title}"`

    case NOTIFICATION_EVENTS.WORKSHOP_CREATE:
      return `Hay un evento que te puede interesar: "${notification.document_data.title}"`

    case NOTIFICATION_EVENTS.ANNOUNCEMENTS_CREATE:
      return `Hay un nuevo anuncio en tu organización.`

    default:
      break;
  }
}

export const getNotificationURL = (notification: Notification, user: User) => {
  console.log('notification ->', notification)

  switch (notification.event_type) {
    case NOTIFICATION_EVENTS.COMMENT_CREATE:
    case NOTIFICATION_EVENTS.COMMENT_LIKE:
      return `/community/post/${notification.document_data._id}`

    case NOTIFICATION_EVENTS.POST_LIKED:
      return `/community/post/${notification.documentRef}`

    case NOTIFICATION_EVENTS.VIDEO_CREATE:
    case NOTIFICATION_EVENTS.VIDEO_COMMENT_LIKED:
    case NOTIFICATION_EVENTS.VIDEO_COMMENT:
      return `/video/${notification.documentRef}`

    case NOTIFICATION_EVENTS.WORKSHOP_CREATE:
      return `/event/${notification.documentRef}`

    case NOTIFICATION_EVENTS.ANNOUNCEMENTS_CREATE:
      return `/company/${user?.community?._id}`

    default:
      return null
  }
}