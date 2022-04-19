import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {

  async handle(request: Request, response: Response): Promise<Response>{
    const { file } = request;

    const importCategoryUsecase = container.resolve(ImportCategoryUseCase)
    
    await importCategoryUsecase.execute(file);
    
    return response.send();
  }
}

export { ImportCategoryController }