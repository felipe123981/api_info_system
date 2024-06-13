import { Request, Response } from 'express';
import ListAdminsService from '../services/ListAdminsService';
import ShowAdminService from '../services/ShowAdminService';
import CreateAdminService from '../services/CreateAdminService';
import UpdateAdminService from '../services/UpdateAdminService';
import DeleteAdminService from '../services/DeleteAdminService';

export default class AdminsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAdmins = new ListAdminsService();

    const admins = await listAdmins.execute();

    return response.json(admins);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, registration_number, password } = request.body;

    const createAdmin = new CreateAdminService();

    const admin = await createAdmin.execute({
      name,
      registration_number,
      password,
    });

    return response.json(admin);
  }
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showAdmin = new ShowAdminService();

    const admin = await showAdmin.execute({ id });

    return response.json(admin);
  }
  public async update(request: Request, response: Response): Promise<Response> {
    const { name, registration_number, password } = request.body;
    const { id } = request.params;

    const updateAdmin = new UpdateAdminService();

    const admin = await updateAdmin.execute({
      id,
      name,
      registration_number,
      password
    });
   return response.json(admin);
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteAdmin = new DeleteAdminService();

    await deleteAdmin.execute({ id });

    return response.json([]);
  }
}
