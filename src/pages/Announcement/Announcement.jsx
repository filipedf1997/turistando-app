import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { View, Text, Button } from 'react-native'
import AnnouncementStore from './store/AnnouncementStore'

const Announcement = observer(({ navigation }) => {
  const [store] = useState(() => new AnnouncementStore())

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Text>ANÚNCIOS</Text>
      <Button onPress={() => navigation.navigate('NewAnnouncement', { store })} title="cadastrar" />
    </View>
  )
})

export default Announcement
