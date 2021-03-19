import { makeAutoObservable } from 'mobx'
import firebase, { db } from '../../../firebase/firebaseConfig'

class MyAccountStore {
  user = {
    name: '',
    fone: '',
    email: '',
    profile: null,
    isProvider: null,
    password: '',
    confirmPassword: '',
  }
  isFetching = false
  requestFeedback = {
    visible: false,
    error: false,
    message: '',
    onPress: null,
    btnName: '',
    secundaryAction: null,
    secundaryName: '',
  }
  faq = []
  selectedQuestion = {}
  passwordVisible = false

  get disableEdit() {
    return !this.user.name || !this.user.fone || (this.user.isProvider && !this.user.profile)
  }

  get disablePassword() {
    return !this.user.password || !this.user.confirmPassword || this.errorPassword || this.errorConfirmPassword
  }

  get errorPassword() {
    return this.user.password !== '' && this.user?.password?.length < 6
  }

  get errorConfirmPassword() {
    return this.user.confirmPassword !== '' && this.user.password !== this.user.confirmPassword
  }

  async uptadeUserData() {
    try {
      this.isFetching = true
      const user = firebase.auth().currentUser
      await db.collection('users').doc(user.uid).update({
        name: this.user.name,
        fone: this.user.fone,
        profile: this.user.profile,
      })
      if (this.user.name) {
        await user.updateProfile({ displayName: this.user.name })
      }

      this.isFetching = false
      this.requestFeedback = {
        visible: true,
        error: false,
        message: 'Dados Alterados com sucesso!',
        onPress: () => { this.requestFeedback.visible = false },
        btnName: 'Ok',
      }

      return true
    } catch (error) {
      this.isFetching = false
      this.requestFeedback = {
        visible: true,
        error: true,
        message: 'Não foi possível alterar seus dados. Tente novamente.',
        onPress: () => { this.requestFeedback.visible = false },
        btnName: 'Ok',
      }

      return false
    }
  }

  async uptadeUserPassword() {
    try {
      this.isFetching = true

      const user = firebase.auth().currentUser
      await user.updatePassword(this.user.password)

      this.isFetching = false
      this.requestFeedback = {
        visible: true,
        error: false,
        message: 'Sua senha foi alterada com sucesso!',
        onPress: () => { this.requestFeedback.visible = false },
        btnName: 'Ok',
      }
    } catch (error) {
      const messageError = error.code === 'auth/requires-recent-login'
        ? 'Você precisa realizar o login novamente para alterar sua senha.'
        : 'Não foi possível alterar sua senha. Tente novamente.'
      this.isFetching = false
      this.requestFeedback = {
        visible: true,
        error: true,
        message: messageError,
        onPress: () => { this.requestFeedback.visible = false },
        btnName: 'Ok',
      }
    }
  }

  async getFaq() {
    try {
      this.isFetching = true
      const response = await db.collection('faq').get()
      response.forEach((item) => this.faq.push(item.data()))
      this.isFetching = false
    } catch (error) {
      this.requestFeedback = {
        visible: true,
        error: true,
        message: 'Não foi possível recuperar as Perguntas Frequentes. Tente novamente.',
        onPress: () => {
          this.requestFeedback.visible = false
          this.requestFeedback.secundaryName = ''
          this.getFaq()
        },
        btnName: 'Tentar novamente',
        secundaryName: 'Cancelar',
        secundaryAction: () => {
          this.requestFeedback.visible = false
          this.requestFeedback.secundaryName = ''
        },
      }
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default MyAccountStore
