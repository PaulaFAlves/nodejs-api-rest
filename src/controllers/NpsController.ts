import { Response, Request, response } from 'express';
import { getCustomRepository, IsNull, Not } from 'typeorm';
import { SurveyUser } from '../models/SurveyUser';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    const surveysUsers = await surveysUsersRepository.find({
      survey_id,
      value: Not(IsNull())
    })

    const detractor = surveysUsers.filter(survey =>
      (survey.value >= 0 && survey.value <= 6)
    ).length

    const promoters = surveysUsers.filter(survey =>
      (survey.value >= 9 && survey.value <= 10)
    ).length

    const passive = surveysUsers.filter(survey =>
      (survey.value >= 7 && survey.value <= 8)
    ).length

    const totalAnswers = surveysUsers.length

    const calculate = Number((((promoters - detractor) / totalAnswers) * 100).toFixed(3))

    return response.json({
      detractor,
      promoters,
      passive,
      totalAnswers,
      nps: calculate
    })
  }
}

export { NpsController }
