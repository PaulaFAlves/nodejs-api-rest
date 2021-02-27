import { Response, Request, response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../errors/AppError';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params
    const { u } = request.query

    const surveysUsersReposotory = getCustomRepository(SurveysUsersRepository)

    const surveyUser = await surveysUsersReposotory.findOne({
      id: String(u)
    })

    if (!surveyUser) {
      throw new AppError("Survey User not exists.")
    }

    surveyUser.value = Number(value)

    await surveysUsersReposotory.save(surveyUser)
    return response.json(surveyUser)
  }
}

export { AnswerController }
