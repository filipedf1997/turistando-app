import { makeAutoObservable } from 'mobx'
import firebase, { db } from '../../../firebase/firebaseConfig'
import buyStatus from '../../../utils/buyStatus'

class HomeProviderStore {
  reservations = []
  isFetching = false
  isRefreshing = false
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

  async getReservations(refresh) {
    try {
      if (refresh) this.isRefreshing = true
      else this.isFetching = true
      const aux = []

      const user = firebase.auth().currentUser
      const response = await db.collection('reservations')
        .where('ownerUID', '==', user.uid)
        .where('status', '!=', buyStatus.REFUSED)
        .get()
      response.forEach((doc) => {
        const reservation = doc.data()
        reservation.id = doc.id
        aux.push(reservation)
      })
      this.reservations = aux

      this.isFetching = false
      this.isRefreshing = false
    } catch (error) {
      this.isFetching = false
      this.isRefreshing = false
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

  async updateReservationStatus(id, status) {
    try {
      this.isFetching = true

      await db.collection('reservations').doc(id).update({ status })
    } catch (error) {
      this.isFetching = false
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default HomeProviderStore
