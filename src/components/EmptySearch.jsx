import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { Entypo } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'

const EmptySearch = () => {
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Não encontramos nenhum anúncio com os filtros escolhidos
      </Text>
      <Entypo name="emoji-sad" size={150} color={colors.black} style={styles.icon} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: RFValue(18),
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    opacity: 0.6,
  },
  icon: { opacity: 0.2 },
})

export default EmptySearch
