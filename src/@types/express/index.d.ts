declare namespace Express {
  export interface Request {
    balconist: {
      id: string;
    };
    admin: {
      id: string;
    };
  }
}
