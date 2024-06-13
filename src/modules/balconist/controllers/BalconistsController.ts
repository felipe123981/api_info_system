import { Request, Response } from 'express';
import ListBalconistsService from '../services/ListBalconistsService';
import ShowBalconistService from '../services/ShowBalconistService';
import CreateBalconistService from '../services/CreateBalconistService';
import UpdateBalconistService from '../services/UpdateBalconistService';
import DeleteBalconistService from '../services/DeleteBalconistService';


export default class BalconistsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const ListBalconists = new ListBalconistsService();

    const balconists = await ListBalconists.execute();

    return response.json(balconists);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, registration_number, password } = request.body;

    const createBalconist = new CreateBalconistService();

    const balconist = await createBalconist.execute({
      name,
      registration_number,
      password,
    });

    return response.json(balconist);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showBalconist = new ShowBalconistService();

    const balconist = await showBalconist.execute({ id });

    return response.json(balconist);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, registration_number, password } = request.body;
    const { id } = request.params;

    const updateBalconist = new UpdateBalconistService();

    const balconist = await updateBalconist.execute({
      id,
      name,
      registration_number,
      password
    });
   return response.json(balconist);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteBalconist = new DeleteBalconistService();

    await deleteBalconist.execute({ id });

    return response.json([]);
  }
}
