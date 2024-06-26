import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';
//import { instanceToInstance } from 'class-transformer';
export default class BalconistsSessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { registration_number, password } = request.body;

    const createSession = new CreateSessionService();

    const balconist = await createSession.execute({
      registration_number,
      password,
    });

    const { method, url, ip } = request;
    console.log(
      `[+] Session Required: \n  =>at: [${new Date().toISOString()}]\n  =>method: ${method}\n  =>url: ${url}\n  =>email: ${registration_number}\n  =>from ${ip}`,
    );

    return response.json(balconist);
  }
}
