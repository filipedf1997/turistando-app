import { makeAutoObservable } from 'mobx'
import firebase, { db } from '../../../firebase/firebaseConfig'

class SignUpStore {
  user = {
    name: '',
    email: '',
    fone: '',
    password: '',
    confirmPassword: '',
    isProvider: false,
    profile: null,
  }
  isFetching = false
  requestFeedback = {
    visible: false,
    error: false,
    message: '',
    onPress: null,
    btnName: '',
  }
  wavesVisibility = true

  get disable() {
    return !this.user.name || !this.user.email || !this.user.password || !this.user.fone
      || !this.user.confirmPassword || (this.user.isProvider && !this.user.profile) || this.errorEmail
      || this.errorPassword || this.errorConfirmPassword
  }

  get errorEmail() {
    return this.user.email !== '' && (!this.user.email.includes('@') || !this.user.email.includes('.'))
  }

  get errorPassword() {
    return this.user.password !== '' && this.user?.password?.length < 6
  }

  get errorConfirmPassword() {
    return this.user.confirmPassword !== '' && this.user.password !== this.user.confirmPassword
  }

  async createUser() {
    try {
      this.isFetching = true
      const {
        user:
        { uid },
      } = await firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
      await firebase.auth().signOut()
      delete this.user.password
      delete this.user.confirmPassword
      await db.collection('users').doc(uid).set(this.user)

      this.isFetching = false
      return true
    } catch (error) {
      this.requestFeedback = {
        visible: true,
        error: true,
        message: this.buildMessageError(error.code),
        onPress: () => { this.requestFeedback.visible = false },
        btnName: 'Ok',
      }

      this.isFetching = false
      return false
    }
  }

  buildMessageError(code) {
    const errorsList = {
      'auth/email-already-in-use': 'O e-mail informado já está em uso. Escolha outro e-mail e tente novamente.',
      default: 'Não foi possível realizar seu cadastro. Verifique seus dados e tente novamente.',
    }

    return errorsList[code] ?? errorsList.default
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default SignUpStore
