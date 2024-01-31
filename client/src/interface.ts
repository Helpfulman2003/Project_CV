interface userState {
  user: {
    currentUser: currentUser;
    isFetching: boolean;
    error: boolean;
  };
}

export interface currentUser {
  accessToken: string;
  phone: number;
  zipCode: number;
  address: {
    city?: string;
    address?: string;
    zipCode?: number;
  };
  avatar: {
    url: { url: string; publicId: string }[];
  };
  email: string;
  name: string;
  password?: string;
  role?: string;
  _id: string;
}

interface shopState {
  shop: {
    currentShop: currentShop;
    isFetching: boolean;
    error: boolean;
  };
}

export interface currentShop {
  accessToken?: string;
  description: string;
  address: string;
  avatar: {
    url: { url: string; publicId: string }[];
  };
  email: string;
  name: string;
  password?: string;
  ratings?: number;
  role?: string;
  _id?: string;
  zipCode: number;
  withdrawMethod?: {};
  availableBalancer: number;
  phone: number;
  transactions: [
    {
      amount?: number;
      status?: string;
    }
  ];
  createdAt: Date;
}

export interface currentProduct {
  images?: {
    url: { url: string; publicId: string }[];
  };
  name: string;
  description?: string;
  _id?: string;
  category?: string;
  originalPrice: number;
  discountPrice: number;
  stock: number;
  shopId?: currentShop;
  sold_out: number;
  quantity?: number;
  reviews: [
    {
      rating: number;
      comment: string;
      userId: currentUser;
      createdAt: Date;
    }
  ];
  ratings: number;
}

interface allProductShopState {
  allProductShop: {
    currentProduct: currentProduct[];
    isFetching: boolean;
    error: boolean;
  };
}

interface allProductState {
  allProduct: {
    currentProduct: currentProduct[];
    isFetching: boolean;
    error: boolean;
  };
}

export interface currentEvent {
  images?: {
    url: { url: string; publicId: string }[];
  };
  name: string;
  description?: string;
  _id?: string;
  category?: string;
  originalPrice: number;
  discountPrice: number;
  stock: number;
  shopId?: currentShop;
  sold_out: number;
  quantity?: number;
  startDate: Date;
  finishDate: Date;
}

interface allEventOfShopState {
  allEventOfShop: {
    currentEventOfShop: currentEvent[];
    isFetching: boolean;
    error: boolean;
  };
}

interface allEventState {
  allEvent: {
    currentEvent: currentEvent[];
    isFetching: boolean;
    error: boolean;
  };
}

interface cartState {
  cart: currentProduct[];
}

interface wishListState {
  wishList: currentProduct[];
}

export interface currentCouponCode {
  name: string;
  _id?: string;
  shopId?: currentShop;
  value: number;
  minAmount: number;
  maxAmount: number;
  productSelected: String;
}

interface couponCodeState {
  allCouponCode: {
    currentCouponCode: currentCouponCode[];
    isFetching: boolean;
    error: boolean;
  };
}

export interface currentOrder {
  _id?: string;
  cart: currentProduct[];
  shippingAddress: shippingAddress;
  user: currentUser;
  totalPrice: number;
  status: string;
  paymentInfo: {
    id: string;
    status: string;
    type: string;
  };
  paidAt: Date;
  createdAt: Date;
}

export interface shippingAddress {
  name: string;
  email: string;
  phone: number;
  zipCode: number;
  city: string;
  address: string;
}

interface allOrderState {
  allOrder: {
    currentOrder: currentOrder[];
    isFetching: boolean;
    error: boolean;
  };
}

export interface currentOrderUser {
  _id?: string;
  cart: currentProduct[];
  shippingAddress: shippingAddress;
  totalPrice: number;
  status: string;
  paymentInfo: {
    id: string;
    status: string;
    type: string;
  };
  paidAt: Date;
  createdAt: Date;
}

interface allOrderUserState {
  allOrderUser: {
    currentOrderUser: currentOrderUser[];
    isFetching: boolean;
    error: boolean;
  };
}

export interface messageState {
  _id?: string;
  message: string;
  user?: [];
  senderId: string;
  createdAt?: Date;
}

export interface rootState {
  user: userState;
  shop: shopState;
  allProductShop: allProductShopState;
  allProduct: allProductState;
  cart: cartState;
  wishList: wishListState;
  allEvent: allEventState;
  allCouponCode: couponCodeState;
  allOrder: allOrderState;
  allOrderUser: allOrderUserState;
  allEventOfShop: allEventOfShopState;
}
