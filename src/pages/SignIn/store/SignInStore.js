import { makeAutoObservable } from 'mobx'
import firebase, { db } from '../../../firebase/firebaseConfig'

class SignInStore {
  email = ''
  password = ''
  isFetching = false
  remember = false
  keyboardHide = true
  requestFeedback = {
    error: false,
    message: '',
    onPress: null,
    btnName: '',
  }
  passwordVisible = false

  get disable() {
    return !this.email || !this.password
  }

  async login() {
    try {
      this.isFetching = true
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence[this.remember ? 'LOCAL' : 'NONE'])
      const { user: { uid } } = await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      const user = await db.collection('users').doc(uid).get()

      this.isFetching = false
      return user.data()
    } catch (error) {
      this.requestFeedback = {
        error: true,
        message: this.buildMessageError(error.code),
        onPress: () => { this.requestFeedback.error = false },
        btnName: 'Ok',
      }

      this.isFetching = false
      return false
    }
  }

  buildMessageError(code) {
    const errorsList = {
      'auth/invalid-email': 'Não foi possível realizar o login. Verifique o e-mail digitado e tente novamente.',
      'auth/user-not-found': 'Não foi possível realizar o login, pois o usuário não foi encontrado em nossa base.',
      'auth/wrong-password': 'Senha incorreta. Tente novamente',
      default: 'Não foi possível realizar o login. Tente novamente.',
    }

    return errorsList[code] ?? errorsList.default
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default SignInStore
