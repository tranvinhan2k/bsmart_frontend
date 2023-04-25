import axiosClient from '~/api/axiosClient';

export interface CartItem {
  id: number;
  status: string;
  level: string | null;
  referenceDiscount: number;
  subject: {
    id: number;
    code: string;
    name: string;
    categoryId: number;
  };
  mentor: {
    id: number;
    username: string;
    introduce: string;
    fullName: string;
    email: string;
    birthday: string;
    address: string;
    phone: string;
    status: true;
    roles: [
      {
        id: number;
        name: string;
        code: string;
      }
    ];
    twitterLink: string;
    facebookLink: string;
    instagramLink: string;
    userImages: [
      {
        id: number;
        name: string;
        url: string;
      }
    ];
    wallet: {
      id: number;
      balance: number;
      previous_balance: number;
      owner_id: number;
    };
  } | null;
  image: {
    id: number;
    name: string;
    url: string;
  } | null;
  subCourses: CartSubCourse[];
  cartItemId: number;
}

export interface CartSubCourse {
  id: number;
  level: string;
  status: string;
  startDateExpected: string;
  endDateExpected: string;
  price: number;
  typeLearn: string;
  isChosen: boolean;
}

export interface ResponseCartItem {
  id: number;
  totalItem: number;
  totalPrice: number;
  cartItems: CartItem[];
}
export interface RequestCartItem {
  cartItemId: number | undefined;
  subCourseId: number | undefined;
}
const url = `/cart`;

const cartApi = {
  async getCart(): Promise<ResponseCartItem> {
    return axiosClient.get(`${url}`);
  },
  async addCourseToCart(data: RequestCartItem): Promise<any> {
    return axiosClient.post(`${url}`, data);
  },
  async updateCourse(data: RequestCartItem): Promise<any> {
    return axiosClient.put(`${url}`, data);
  },
  async deleteCourse(data: RequestCartItem): Promise<any> {
    return axiosClient.delete(`${url}`, {
      data,
    });
  },
};

export default cartApi;
