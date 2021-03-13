import { makeAutoObservable } from 'mobx'
import { db, storage } from '../../../firebase/firebaseConfig'
import { experiencesTypes } from '../../../utils/annoucementTypes'

class HomeTravelerStore {
  announcements = []
  isFetching = false
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
    rating: null,
    comments: [],
    id: '',
  }
  limit = 5
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
      rating: null,
      comments: [],
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
  }

  async getAnnouncements() {
    try {
      const aux = []
      this.isFetching = true

      let announcementsRef = db.collection('announcements')
      if (this.filterExperiences.length) announcementsRef = announcementsRef.where('experiencesTypes', 'array-contains-any', this.filterExperiences)
      if (this.filtertMinAmount) announcementsRef = announcementsRef.where('amount', '>=', this.filtertMinAmount)
      if (this.filtertMaxAmount) announcementsRef = announcementsRef.where('amount', '<=', this.filtertMaxAmount)
      const response = await announcementsRef.limit(this.limit).get()
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
    } catch (error) {
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

      let announcementsRef = db.collection('announcements')
      if (this.filterExperiences.length) announcementsRef = announcementsRef.where('experiencesTypes', 'array-contains-any', this.filterExperiences)
      if (this.filtertMinAmount) announcementsRef = announcementsRef.where('amount', '>=', this.filtertMinAmount)
      if (this.filtertMaxAmount) announcementsRef = announcementsRef.where('amount', '<=', this.filtertMaxAmount)
      const response = await announcementsRef
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
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default HomeTravelerStore
