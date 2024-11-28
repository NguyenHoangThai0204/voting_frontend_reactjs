export interface User {
    filter(arg0: (vote: Poll) => boolean): unknown;
    _id: string;
    email: string;
    password?: string; // Tùy chọn, nếu cần
    fullName?: string;
    avatar?: string;
    phone?: string;
    dateOfBirth?: string;
    gender?: string;
    province?: string;
    district?: string;
    status?: string;
    ward?: string;
    street?: string;
    role?: string;
    address?: string;
    __v?: number; // Tùy chọn, nếu cần
}
export interface UserCreate {
  email: string;
  password?: string; // Tùy chọn, nếu cần
  fullName?: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: string;
  province?: string;
  district?: string;
  status?: string;
  ward?: string;
  street?: string;
  role?: string;
  address?: string;
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
    data: Poll[];
  }
export interface VoteResponse {
  status: string;
  message: string;
  data: Vote;
  }
  export interface VoteResultResponse {
    status: string;
    message: string;
    data: VoteResult;
    }
  export interface ListVotePollidResponse {
    status: string;
    message: string;
    data: Vote[];
}
export interface PollResponse {
    status: string;
    message: string;
    data: Poll;
}
export interface TheNewResponse {
      status: string;
      message: string;
      data: TheNew;
    }
    export interface ListTheNewResponse {
      status: string;
      message: string;
      data: TheNew[];
    }
export interface Poll {
    _id:string ;
    authorId: string;
    avatar: string | null;
    title: string;
    description: string;
    timeCreate: string;
    timeStart: string | null;
    timeEnd: string;
    options: Option[];
    typeContent: string;
    pollIdSm: string | null;
}

export interface Option {
  _id:string  ;
  contentOption: string;
  additonalContentOption: string | null;
  descriptionContentOption: string;
  avatarContentOption: string | null;
  votes: Vote[];
}
export interface PollCreate {
  authorId: string;
  avatar: string | null;
  title: string;
  description: string;
  timeCreate: string;
  timeStart: string | null;
  timeEnd: string| null;
  options: OptionCreate[];
  typeContent: string;
  pollIdSm: string | null;
}

export interface OptionCreate {
contentOption: string;
additonalContentOption: string | null;
avatarContentOption: string | null;
descriptionContentOption: string;
votes: Vote[];
}
export interface Vote {
  pollId: string | null;  
  optionId: string;  
  userId: string | null;  
  timestamp: string;
  transactionHash: string | null;  
}
export interface VoteResult {
  _id: string;
  pollId: string | null;  
  optionId: string;  
  userId: string | null;  
  timestamp: string;
  transactionHash: string | null;  
}
export interface TheNew{
  tenBaiViet: string;
  chuDeBaiViet: string;
  _id:string | null;
  hinhAnhBaiViet: string;
  noiDungBaiViet: string;
  nguoiViet: string ;
  thoiGianViet: string| null;
}
export interface CreateTheNew{
  tenBaiViet: string;
  chuDeBaiViet: string;
  hinhAnhBaiViet: string;
  noiDungBaiViet: string;
  nguoiViet: string ;
  thoiGianViet: string| null;
}