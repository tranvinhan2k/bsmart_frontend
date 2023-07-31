import { DetailCourseClassPayload } from '~/pages/MentorCourseDetailPage';
import { ClassStatusKeys, LevelKeys } from '../variables';

export interface CartDataPayload {
  id: number;
  totalItem: number;
  totalPrice: number;
  cartItems: DetailCourseClassPayload[];
}

export interface CartItemDataPayload {
  id: number;
  status: ClassStatusKeys;
  level: LevelKeys;
  referenceDiscount: number;
  subject: {
    id: 0;
    code: 'string';
    name: 'string';
    categoryId: 0;
  };
  image: {
    id: 0;
    name: 'string';
    url: 'string';
    status: true;
    type: 'COURSE';
  };
  subCourses: [
    {
      id: 0;
      level: 'BEGINNER';
      status: 'REQUESTING';
      startDateExpected: '2023-04-25T12:37:12.009Z';
      endDateExpected: '2023-04-25T12:37:12.009Z';
      price: 0;
      typeLearn: 'OFFLINE';
      isChosen: true;
      mentor: {
        id: 0;
        fullName: 'string';
        email: 'string';
        birthday: '2023-04-25T12:37:12.009Z';
        address: 'string';
        phone: 'string';
        status: true;
        roles: [
          {
            id: 0;
            name: 'string';
            code: 'TEACHER';
          }
        ];
        twitterLink: 'string';
        facebookLink: 'string';
        instagramLink: 'string';
        userImages: [
          {
            id: 0;
            name: 'string';
            url: 'string';
            status: true;
            type: 'COURSE';
          }
        ];
        wallet: {
          id: 0;
          balance: 0;
          previous_balance: 0;
          owner_id: 0;
        };
        mentorProfile: {
          id: 0;
          introduce: 'string';
          workingExperience: 'string';
          user: 'string';
          mentorSkills: [
            {
              skillId: 0;
              name: 'string';
              yearOfExperiences: 0;
            }
          ];
        };
      };
      image: {
        id: 0;
        name: 'string';
        url: 'string';
        status: true;
        type: 'COURSE';
      };
    }
  ];
  cartItemId: 0;
}
