import { makeAutoObservable } from 'mobx'
import firebase, { db } from '../../../firebase/firebaseConfig'
import buyStatus from '../../../utils/buyStatus'

class ReservationsStore {
  reservations = []
  announcement = {}
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
  rating = {
    comment: '',
    name: '',
    stars: 0,
    turistando: null,
  }
  turistandoGrades = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  resetStore() {
    this.announcement = {}
    this.isFetching = false
    this.requestFeedback = {
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
    this.rating = {
      comment: '',
      name: '',
      stars: 0,
      turistando: null,
    }
  }

  async getReservations() {
    try {
      const user = firebase.auth().currentUser
      let reservation = {}
      let aux = []

      const unsubscribe = db.collection('reservations')
        .where('travelerUid', '==', user.uid)
        .onSnapshot((querySnapshot) => {
          aux = []
          querySnapshot.forEach((doc) => {
            reservation = doc.data()
            this.setConcludedStatus(reservation, doc.id)
            aux.push(reservation)
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

  async doRating() {
    try {
      this.isFetching = true

      const updatedAnnouncement = (await db.collection('announcements').doc(this.announcement.id).get()).data()
      this.rating.name = firebase.auth().currentUser.displayName
      updatedAnnouncement.rating.push(this.rating)

      const totalStars = updatedAnnouncement.rating.reduce((acc, cur) => acc + cur.stars, 0)
      const averageRatings = (totalStars / updatedAnnouncement.rating.length).toFixed(1)

      await db.collection('announcements').doc(this.announcement.id)
        .update({
          rating: updatedAnnouncement.rating,
          averageRatings,
        })

      this.isFetching = false
      return true
    } catch (error) {
      this.isFetching = false
      return false
    }
  }

  async setConcludedStatus(reservationData, reservationId) {
    try {
      const currentDate = new Date().getTime() / 1000
      const reservationConcluded = reservationData.status === buyStatus.CONFIRMED && currentDate > reservationData.reservationDate.seconds
      if (!reservationConcluded) return false

      await db.collection('reservations').doc(reservationId)
        .update({
          status: buyStatus.CONCLUDED,
        })

      return true
    } catch (error) {
      return false
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default ReservationsStore
