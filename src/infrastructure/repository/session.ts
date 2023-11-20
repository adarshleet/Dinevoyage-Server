import session, { SessionOptions } from 'express-session';
import { Request, Response, NextFunction } from 'express';

interface SessionData {
  bookingDetails:{
    restaurantId:string,
    date:string,
    time:string
  }
}

class Session{
  private sessionOptions: SessionOptions;

  constructor() {
    this.sessionOptions = {
      secret: 'your_secret_key',
      resave: false,
      saveUninitialized: false,
    };
  }

  sessionSetup(req: Request, data: any):object {
    session(this.sessionOptions)(req, {} as any, () => {});
    const sessionData = req.session as unknown as SessionData;
    sessionData.bookingDetails = data;

    return sessionData.bookingDetails;
  }
}

export default Session;
