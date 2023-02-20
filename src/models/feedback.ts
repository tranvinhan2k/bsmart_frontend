import { UserPayload } from '~/models/user';

export interface FeedbackPayload {
  percentOfFeedback: number;
  numOfRating: number;
  starData: StarPayload[];
  commentData: CommentPayload[];
}

export interface StarPayload {
  starNumber: number;
  starRating: number;
}

export interface CommentPayload {
  userData: {
    avatar: string;
    name: string;
  };
  ratingStar: number;
  commentContent: string;
  dateUpdate: string;
}
