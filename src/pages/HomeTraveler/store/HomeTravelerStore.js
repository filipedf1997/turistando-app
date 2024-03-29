import { makeAutoObservable } from 'mobx'
import firebase, { db, storage } from '../../../firebase/firebaseConfig'
import { experiencesTypes, days as daysTypes, sortData } from '../../../utils/annoucementTypes'
import buyStatus from '../../../utils/buyStatus'

class HomeTravelerStore {
  announcements = []
  isFetching = false
  isRefreshing = false
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
    rating: [],
    averageRatings: 0,
    id: '',
  }
  limit = 10
  lastVisible = null
  requestFeedback = {
    visible: false,
    error: false,
    message: '',
    onPress: null,
    btnName: '',
    secundaryAction: null,
    secundaryName: '',
  }
  noMoreAnnouncements = false
  experiencesTypes = experiencesTypes
  filterExperiences = []
  showDatePicker = false
  filterDateText = null
  filterDate = ''
  filtertMinAmount = null
  filtertMaxAmount = null
  reservationDateText = null
  reservationDate = ''
  days = daysTypes
  snackbarVisibility = false
  isFavorite = false
  paymentData = {
    cardNumber: '',
    cardDate: null,
    cardCVV: '',
    cardHolder: '',
    cardHolderCpf: '',
    isIndication: false,
    indication: '',
  }
  isCardDetail = false
  sortData = sortData
  chosenSort = 1

  get disable() {
    return !this.paymentData.cardNumber || !this.paymentData.cardDate || !this.paymentData.cardCVV
    || !this.paymentData.cardHolder || !this.paymentData.cardHolderCpf
    || (this.paymentData.isIndication && !this.paymentData.indication)
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
      error: false,
      message: '',
      onPress: null,
      btnName: '',
      secundaryAction: null,
      secundaryName: '',
    }
    this.reservationDateText = null
    this.reservationDate = ''
    this.isFavorite = false
    this.paymentData = {
      cardNumber: '',
      cardDate: null,
      cardCVV: '',
      cardHolder: '',
      cardHolderCpf: '',
      isIndication: false,
      indication: '',
    }
    this.isCardDetail = false
  }

  async getAnnouncements(isRefreshing) {
    try {
      const aux = []
      this.noMoreAnnouncements = false
      if (isRefreshing) this.isRefreshing = true
      else this.isFetching = true

      const orderBy = this.orderByData()

      let announcementsRef = db.collection('announcements')
      if (this.filterExperiences.length) announcementsRef = announcementsRef.where('experiencesTypes', 'array-contains-any', this.filterExperiences)
      if (this.filtertMinAmount) announcementsRef = announcementsRef.where('amount', '>=', this.filtertMinAmount)
      if (this.filtertMaxAmount) announcementsRef = announcementsRef.where('amount', '<=', this.filtertMaxAmount)
      if (this.chosenSort !== 3 && this.chosenSort !== 4 && (this.filtertMinAmount || this.filtertMaxAmount)) announcementsRef = announcementsRef.orderBy('amount')
      const response = await announcementsRef
        .orderBy(orderBy.field, orderBy.direction)
        .limit(this.limit)
        .get()
      response.forEach((item) => {
        const announcement = item.data()
        announcement.id = item.id
        if (this.filterDate) {
          if (announcement.dates.includes(this.filterDate)) {
            aux.push(announcement)
          }
        } else {
          aux.push(announcement)
        }
      })
      this.announcements = aux
      this.lastVisible = response.docs[response.docs.length - 1]

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
          this.getAnnouncements()
        },
        btnName: 'Tentar novamente',
        secundaryName: 'Cancelar',
        secundaryAction: () => {
          this.requestFeedback.visible = false
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

  async getMoreAnnouncements() {
    try {
      if (this.noMoreAnnouncements) {
        return
      }

      let moreAnnouncements = []
      const orderBy = this.orderByData()

      let announcementsRef = db.collection('announcements')
      if (this.filterExperiences.length) announcementsRef = announcementsRef.where('experiencesTypes', 'array-contains-any', this.filterExperiences)
      if (this.filtertMinAmount) announcementsRef = announcementsRef.where('amount', '>=', this.filtertMinAmount)
      if (this.filtertMaxAmount) announcementsRef = announcementsRef.where('amount', '<=', this.filtertMaxAmount)
      if (this.chosenSort !== 3 && this.chosenSort !== 4 && (this.filtertMinAmount || this.filtertMaxAmount)) announcementsRef = announcementsRef.orderBy('amount')
      const response = await announcementsRef
        .orderBy(orderBy.field, orderBy.direction)
        .startAfter(this.lastVisible)
        .limit(this.limit)
        .get()
      response.forEach((item) => {
        const announcement = item.data()
        announcement.id = item.id
        if (this.filterDate) {
          if (!announcement.includes(this.filterDate)) {
            return
          }
        }
        moreAnnouncements.push(announcement)
      })

      moreAnnouncements = await this.getMorePhotos(moreAnnouncements)

      this.announcements = [...this.announcements, ...moreAnnouncements]
      this.lastVisible = response.docs[response.docs.length - 1]

      this.noMoreAnnouncements = response.empty
    } catch (error) {
      this.requestFeedback = {
        visible: true,
        error: true,
        message: 'Não foi possível recuperar mais anúncios. Tente novamente.',
        onPress: () => { this.requestFeedback.visible = false },
        btnName: 'Ok',
        secundaryName: 'Cancelar',
        secundaryAction: () => {
          this.requestFeedback.visible = false
          this.requestFeedback.secundaryName = ''
        },
      }
    }
  }

  async getMorePhotos(moreAnnouncements) {
    try {
      let moreAnnouncementsCopy = moreAnnouncements
      moreAnnouncementsCopy = await Promise.all(moreAnnouncementsCopy.map(async (announcement) => {
        const url = await storage.child(`announcements/${announcement.id}`).getDownloadURL()
        announcement.photo = url
        return announcement
      }))
      return moreAnnouncementsCopy
    } catch (error) {
      throw new Error()
    }
  }

  clearFilters() {
    this.filterExperiences = []
    this.showDatePicker = false
    this.filterDateText = null
    this.filterDate = null
    this.filtertMinAmount = null
    this.filtertMaxAmount = null
    this.chosenOrder = 1
  }

  async buyExperience() {
    try {
      this.isFetching = true
      const user = firebase.auth().currentUser
      const buy = {
        travelerUid: user.uid,
        travelerName: user.displayName,
        ownerUID: this.announcement.ownerUID,
        announcement: this.announcement,
        announcementId: this.announcement.id,
        purchaseDate: new Date(),
        reservationDate: this.reservationDateText,
        status: buyStatus.PENDING,
      }
      await db.collection('reservations').add(buy)
      this.isFetching = false
      return true
    } catch (error) {
      this.isFetching = false
      return false
    }
  }

  orderByData() {
    const sortTypes = {
      1: { field: 'averageRatings', direction: 'desc' },
      2: { field: 'title', direction: 'asc' },
      3: { field: 'amount', direction: 'asc' },
      4: { field: 'amount', direction: 'desc' },
    }
    return sortTypes[this.chosenSort]
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default HomeTravelerStore
