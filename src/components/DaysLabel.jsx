import React from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import { s, vs } from 'react-native-size-matters'

const DaysLabel = ({ dates }) => {
  const { colors } = useTheme()
  const days = [
    { short: 'D', long: 'Dom' },
    { short: 'S', long: 'Seg' },
    { short: 'T', long: 'Ter' },
    { short: 'Q', long: 'Qua' },
    { short: 'Q', long: 'Qui' },
    { short: 'S', long: 'Sex' },
    { short: 'S', long: 'Sab' },
  ]

  return (
    <View style={styles.container}>
      {days.map((day, index) => (
        <View key={index} style={[styles.wrapper, dates.includes(day.long) ? { backgroundColor: colors.primary } : { borderWidth: 1 }]}>
          <Text style={{ fontSize: 10, color: dates.includes(day.long) ? colors.white : colors.lightText }}>
            {day.short}
          </Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: vs(3),
    marginBottom: vs(7),
  },
  wrapper: {
    alignItems: 'center',
    width: s(18),
    paddingVertical: vs(1),
    borderRadius: 3,
  },
})

export default DaysLabel
