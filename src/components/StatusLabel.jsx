import React from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import {
  useTheme, Text,
} from 'react-native-paper'
import { vs } from 'react-native-size-matters'
import { RFValue } from 'react-native-responsive-fontsize'

const StatusLabel = ({ status }) => {
  const { colors } = useTheme()

  function statusType(type) {
    const statusData = {
      PENDING: { text: 'Aguardando confirmação', color: colors.orange },
      CONFIRMED: { text: 'Confirmado', color: colors.primary },
      REFUSED: { text: 'Cancelado', color: colors.black },
      CONCLUDED: { text: 'Concluído', color: colors.darkGreen },
    }
    return statusData[type] ?? statusData.PENDING
  }

  return (
    <View style={[styles.container, { backgroundColor: statusType(status).color }]}>
      <Text style={[styles.text, { color: colors.white }]}>
        {statusType(status).text}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: vs(30),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginBottom: 8,
  },
  text: {
    fontFamily: 'Roboto-Bold',
    fontSize: RFValue(13),
  },
})

export default StatusLabel
