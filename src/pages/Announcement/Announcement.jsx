import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import {
  Image,
  StyleSheet,
  View,
  Button,
} from 'react-native'
import {
  Text, useTheme, ActivityIndicator, Surface,
} from 'react-native-paper'
import {
  Container, Content, HeaderBarLogo,
} from '../../components'
import AnnouncementStore from './store/AnnouncementStore'

const Announcement = observer(({ navigation }) => {
  const [store] = useState(() => new AnnouncementStore())
  const { colors } = useTheme()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      store.getAnnouncements()
    })
    return unsubscribe
  }, [navigation])

  return (
    <Container>
      <HeaderBarLogo />
      <Content scrollViewProps={{ contentContainerStyle: styles.container }}>
        {store.announcements.map((item) => (
          <Surface
            key={item.id}
            style={{
              flexDirection: 'row',
              width: '100%',
              elevation: 6,
              borderRadius: 5,
              padding: 15,
              alignItems: 'center',
            }}
          >
            <Image source={{ uri: item.photo }} style={{ width: 110, height: 120, borderRadius: 2 }} />
            <View style={{
              justifyContent: 'space-between',
              marginLeft: 15,
              flex: 1,
            }}
            >
              <Text style={{
                fontSize: 15,
              }}
              >
                {item.title}
              </Text>
              <Text style={{
                fontSize: 12,
              }}
              >
                Uma aventura pelas Falésias de Beberibe. Uma aventura pelas Falésias.
              </Text>
              <View style={{ marginVertical: 5 }}>
                <Text style={{
                  fontSize: 14,
                }}
                >
                  Dias da semana
                </Text>
                <Text style={{
                  fontSize: 16,
                }}
                >
                  Dias da semana
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Text>R$ 125</Text>
                <Text>      Editar      </Text>
              </View>
            </View>
          </Surface>
        ))}
        <Button title="cadastrar" onPress={() => navigation.navigate('NewAnnouncement', { store })} />
      </Content>

    </Container>
  )
})

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  title: {
    fontSize: 25,
    marginVertical: 20,
  },
  activityIndicator: { marginTop: 120 },
})

export default Announcement
