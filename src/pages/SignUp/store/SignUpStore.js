import { makeAutoObservable } from 'mobx'
import firebase, { db } from '../../../firebase/firebaseConfig'
import getCep from '../../../service/cepApi'
import { banks, accountTypes } from '../../../utils/bankData'

class SignUpStore {
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
  }
  passwordVisible = false
  errorCep = false
  banks = banks
  accountTypes = accountTypes

  get disable() {
    return !this.user.name || !this.user.email || !this.user.password || !this.user.fone
      || !this.user.confirmPassword || (this.user.isProvider && !this.user.profile) || this.errorEmail
      || this.errorPassword || this.errorConfirmPassword
  }

  get financialDataDisable() {
    return !this.user.financialData.bank || !this.user.financialData.holderAccount || !this.user.financialData.accountType
      || !this.user.financialData.account || !this.user.financialData.agency || !this.user.financialData.cpf
  }

  get adressDisable() {
    return !this.user.address.cep || !this.user.address.street || !this.user.address.district
      || !this.user.address.city || !this.user.address.uf || !this.user.address.number
      || this.errorCep
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

export default SignUpStore
