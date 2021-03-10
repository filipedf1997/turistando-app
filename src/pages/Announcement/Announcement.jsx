import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import {
  Container, Content, HeaderBarLogo, Button, AnnouncementCard,
} from '../../components'
import AnnouncementStore from './store/AnnouncementStore'

const Announcement = observer(({ navigation }) => {
  const [store] = useState(() => new AnnouncementStore())

  useEffect(() => {
    store.getAnnouncements()
  }, [])

  return (
    <Container style={styles.container}>
      <HeaderBarLogo />
      {store.isFetching ? <ActivityIndicator /> : (
        <Content scrollViewProps={{ contentContainerStyle: styles.content }}>
          {store.announcements.map((item) => (
            <AnnouncementCard
              key={item.id}
              item={item}
              action={() => {
                store.announcement = item
                navigation.navigate('EditAnnouncement', { store })
              }}
            />
          ))}
        </Content>
      )}
      <View style={{ padding: 20, backgroundColor: '#F2F2F2' }}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('NewAnnouncement', { store })}
        >
          Adicionar anúncio
        </Button>
      </View>
    </Container>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  content: {
    paddingVertical: 20,
    backgroundColor: '#F2F2F2',
  },
})

export default Announcement
