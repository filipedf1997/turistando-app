import { makeAutoObservable } from 'mobx'
import firebase, { db } from '../../../firebase/firebaseConfig'

class ReservationsStore {
  reservations = []
  announcement= {}
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

  async doRating() {
    try {
      this.isFetching = true

      this.rating.name = firebase.auth().currentUser.displayName

      await db.collection('announcements').doc(this.announcement.id)
        .update({
          rating: firebase.firestore.FieldValue.arrayUnion(this.rating),
        })

      this.isFetching = false
      return true
    } catch (error) {
      this.isFetching = false
      return false
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default ReservationsStore
