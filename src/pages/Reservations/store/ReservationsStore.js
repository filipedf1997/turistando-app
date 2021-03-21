import { makeAutoObservable } from 'mobx'
import firebase, { db } from '../../../firebase/firebaseConfig'

class ReservationsStore {
  reservations = []
  isFetching = true
  requestFeedback = {
    visible: false,
    error: false,
    title: '',
    message: '',
    onPress: null,
    btnName: '',
    secundaryAction: null,
    secundaryName: '',
    withoutIcon: false,
  }

  async getReservations() {
    try {
      const user = firebase.auth().currentUser
      let aux = []

      const unsubscribe = db.collection('reservations')
        .where('travelerUid', '==', user.uid)
        .onSnapshot((querySnapshot) => {
          aux = []
          querySnapshot.forEach((doc) => {
            aux.push(doc.data())
          })
          this.reservations = aux
          this.isFetching = false
        })

      firebase.auth().onAuthStateChanged(async (currentUser) => {
        if (!currentUser) {
          unsubscribe()
        }
      })
    } catch (error) {
      this.isFetching = false
      this.requestFeedback = {
        visible: true,
        error: true,
        message: 'Não foi possível recuperar as reservas.Tente novamente.',
        onPress: () => {
          this.requestFeedback.visible = false
          this.requestFeedback.secundaryName = ''
          this.getReservations()
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

export default ReservationsStore
