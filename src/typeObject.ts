export interface User {
    filter(arg0: (vote: Vote) => boolean): unknown;
    _id: string;
    email: string;
    password?: string; // Tùy chọn, nếu cần
    fullName?: string;
    avatar?: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: string;
    __v?: number; // Tùy chọn, nếu cần
  }
  

  export interface UserResponse {
    status: string;
    message: string;
    data: User;
  }
  export interface ListVoteResponse {
    status: string;
    message: string;
    data: Vote[];
}
export interface VoteResponse {
  status: string;
  message: string;
  data: Vote;
}

  export interface Vote {
    _id: string;
    authorId: string;
    avatar: string;
    title: string;
    description: string;
    timeCreate: string;
    timeStart: string;
    timeEnd: string;
    selectors: Selector[];
    typeContent: string;
}

export interface Selector {
    contentSelector: string;
    descriptionContentSelector: string;
    _id: string;
}


