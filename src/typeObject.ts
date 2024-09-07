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
  data: Poll;
  }

export interface Poll {
    _id:string ;
    authorId: string;
    avatar: string | null;
    title: string;
    description: string;
    timeCreate: string;
    timeStart: string | null;
    timeEnd: string| null;
    options: Option[];
    typeContent: string;
}

export interface Option {
  _id:string  ;
  contentOption: string;
  additonalContentOption: string | null;
  descriptionContentOption: string;
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
}

export interface OptionCreate {
contentOption: string;
additonalContentOption: string | null;
descriptionContentOption: string;
votes: Vote[];
}
export interface Vote {
  pollId: string;  
  optionId: string;  
  userId: string;  
  timestamp: string;
  transactionHash: string | null;  
}


