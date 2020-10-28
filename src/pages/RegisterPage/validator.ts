import { projectFirestore } from '../../config/firebaseConfig'
import { IRegisterUserModel } from './IRegisterUserModel'

interface IValidationResult {
  success: boolean
  error?: string
}

export const validate = async (model: IRegisterUserModel): Promise<IValidationResult> => {
  if (model.nick.length < 4 || model.nick.length > 20)
    return Promise.resolve({
      success: false,
      error: 'Nick cannot be shorter than 4 chars and not longer than 20 chars.',
    })

  if (model.nick.includes(' '))
    return Promise.resolve({
      success: false,
      error: 'Nick cannot contain empty spaces. Use underscore instead.',
    })

  const usersWithSameNick = await projectFirestore
    .collection('users')
    .where('nick', '==', model.nick)
    .get()

  if (!usersWithSameNick.empty)
    return Promise.resolve({
      success: false,
      error: `User with nick ${model.nick} already exists.`,
    })

  return Promise.resolve({
    success: true,
  })
}
