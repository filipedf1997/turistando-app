import { makeAutoObservable } from 'mobx'
import firebase, { db } from '../../../firebase/firebaseConfig'
import getCep from '../../../service/cepApi'
import { banks, accountTypes } from '../../../utils/bankData'

class MyAccountStore {
  user = {
    name: '',
    email: '',
    fone: '',
    password: '',
    confirmPassword: '',
    isProvider: false,
    profile: null,
    address: {
      cep: '',
      cepNumber: 0,
      street: '',
      number: '',
      district: '',
      city: '',
      uf: '',
    },
    financialData: {
      bank: '',
      holderAccount: '',
      accountType: '',
      account: '',
      agency: '',
      cpf: '',
    },
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
  errorCep = false
  banks = banks
  accountTypes = accountTypes

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

  async uptadeUserAddress() {
    try {
      this.isFetching = true
      const user = firebase.auth().currentUser
      await db.collection('users').doc(user.uid).update({
        address: this.user.address,
      })

      this.isFetching = false
      this.requestFeedback = {
        visible: true,
        error: false,
        message: 'Endereço alterado com sucesso!',
        onPress: () => { this.requestFeedback.visible = false },
        btnName: 'Ok',
      }

      return true
    } catch (error) {
      this.isFetching = false
      this.requestFeedback = {
        visible: true,
        error: true,
        message: 'Não foi possível alterar seu endereço. Tente novamente.',
        onPress: () => { this.requestFeedback.visible = false },
        btnName: 'Ok',
      }

      return false
    }
  }

  async uptadeUserFinancialData() {
    try {
      this.isFetching = true
      const user = firebase.auth().currentUser
      await db.collection('users').doc(user.uid).update({
        financialData: this.user.financialData,
      })

      this.isFetching = false
      this.requestFeedback = {
        visible: true,
        error: false,
        message: 'Dados bancários alterados com sucesso!',
        onPress: () => { this.requestFeedback.visible = false },
        btnName: 'Ok',
      }

      return true
    } catch (error) {
      this.isFetching = false
      this.requestFeedback = {
        visible: true,
        error: true,
        message: 'Não foi possível alterar seus dados bancários. Tente novamente.',
        onPress: () => { this.requestFeedback.visible = false },
        btnName: 'Ok',
      }

      return false
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

  async getAddress() {
    const response = await getCep(this.user.address.cep)
    if (!response.erro) {
      this.user.address.street = response.logradouro
      this.user.address.district = response.bairro
      this.user.address.city = response.localidade
      this.user.address.uf = response.uf
      this.errorCep = false
    } else {
      this.errorCep = true
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default MyAccountStore
