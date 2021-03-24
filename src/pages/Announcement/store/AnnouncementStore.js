import { makeAutoObservable } from 'mobx'
import firebase, { db, storage } from '../../../firebase/firebaseConfig'
import { experiencesTypes as xpTypes, days as daysTypes } from '../../../utils/annoucementTypes'
import buyStatus from '../../../utils/buyStatus'

class AnnouncementStore {
  announcements = []
  announcement = {
    title: '',
    experiencesTypes: [],
    description: '',
    photo: null,
    amount: null,
    amountText: '',
    dates: [],
    ownerUID: '',
    ownerName: '',
    ownerDescription: '',
    rating: [],
    averageRatings: 0,
    id: '',
  }
  experiencesTypes = xpTypes
  days = daysTypes
  photoBlob = ''
  isFetching = false
  isFetchingDelete = false
  isRefreshing = false
  requestFeedback = {
    visible: false,
    visibleEdit: false,
    error: false,
    message: '',
    onPress: null,
    btnName: '',
    secundaryAction: null,
    secundaryName: '',
    withoutIcon: false,
  }
  ownerName = ''
  ownerDescription = ''

  get disable() {
    return !this.announcement.title || !this.announcement.experiencesTypes.length
      || !this.announcement.description || !this.announcement.photo
      || !this.announcement.amountText || !this.announcement.dates.length
  }

  resetStore() {
    this.announcement = {
      title: '',
      experiencesTypes: [],
      description: '',
      photo: null,
      amount: null,
      amountText: '',
      dates: [],
      ownerUID: '',
      ownerName: '',
      ownerDescription: '',
      rating: [],
      averageRatings: 0,
      id: '',
    }
    this.requestFeedback = {
      visible: false,
      visibleEdit: false,
      error: false,
      message: '',
      onPress: null,
      btnName: '',
      secundaryAction: null,
      secundaryName: '',
      withoutIcon: false,
    }
    this.photoBlob = ''
  }

  handleDayChange(value) {
    if (this.announcement.dates.includes(value)) {
      this.announcement.dates = this.announcement.dates.filter((day) => day !== value)
    } else {
      this.announcement.dates.push(value)
    }
  }

  async createAnnouncement() {
    try {
      this.isFetching = true

      const user = firebase.auth().currentUser
      this.announcement.ownerUID = user.uid
      this.announcement.ownerName = this.ownerName
      this.announcement.ownerDescription = this.ownerDescription
      const { id } = await db.collection('announcements').add(this.announcement)
      await storage.child(`announcements/${id}`).put(this.photoBlob)

      this.isFetching = false
      return true
    } catch (error) {
      this.isFetching = false
      return false
    }
  }

  async editAnnouncement() {
    try {
      this.isFetching = true
      this.announcement.ownerName = this.ownerName
      this.announcement.ownerDescription = this.ownerDescription
      await db.collection('announcements').doc(this.announcement.id).update(this.announcement)
      if (!this.photoBlob) {
        const response = await fetch(this.announcement.photo)
        this.photoBlob = await response.blob()
      }
      await storage.child(`announcements/${this.announcement.id}`).put(this.photoBlob)

      this.isFetching = false
      return { status: true, message: 'Anúncio editado com sucesso!' }
    } catch (error) {
      this.isFetching = false
      return { status: false, message: 'Não foi possível editar o anúncio. Tente novamente.' }
    }
  }

  async getAnnouncements(isRefreshing) {
    try {
      const aux = []
      if (isRefreshing) this.isRefreshing = true
      else this.isFetching = true

      const { uid } = firebase.auth().currentUser
      const response = await db.collection('announcements').where('ownerUID', '==', uid).get()
      response.forEach((item) => {
        const announcement = item.data()
        announcement.id = item.id
        aux.push(announcement)
      })
      this.announcements = aux

      await this.getPhotos()

      this.isFetching = false
      this.isRefreshing = false
    } catch (error) {
      this.isFetching = false
      this.isRefreshing = false
      this.requestFeedback = {
        visible: true,
        error: true,
        message: 'Não foi possível recuperar os anúncios. Tente novamente.',
        onPress: () => {
          this.requestFeedback.visible = false
          this.requestFeedback.secundaryName = ''
          this.getAnnouncements()
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

  async getPhotos() {
    try {
      this.announcements = await Promise.all(this.announcements.map(async (announcement) => {
        const url = await storage.child(`announcements/${announcement.id}`).getDownloadURL()
        announcement.photo = url
        return announcement
      }))
    } catch (error) {
      throw new Error()
    }
  }

  async deleteAnnouncement() {
    try {
      this.isFetchingDelete = true

      const announcementReservations = await db.collection('reservations')
        .where('announcementId', '==', this.announcement.id)
        .where('status', 'in', [buyStatus.PENDING, buyStatus.CONFIRMED])
        .get()
      if (!announcementReservations.empty) {
        this.isFetchingDelete = false
        return { status: false, message: 'Não foi possível excluir o anúncio, pois existem reservas pendentes ou confirmadas para o mesmo.' }
      }

      await db.collection('announcements').doc(this.announcement.id).delete()

      this.isFetchingDelete = false
      return { status: true, message: 'Anúncio excluído com sucesso!' }
    } catch (error) {
      this.isFetchingDelete = false
      return { status: false, message: 'Não foi possível excluir o anúncio. Tente novamente.' }
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default AnnouncementStore
