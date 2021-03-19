import React, { useEffect } from 'react'
import {
  Modal, Portal, Text, useTheme,
} from 'react-native-paper'
import { StyleSheet, View, Keyboard } from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'
import Button from './Button'

const ModalFeedback = ({
  title, visible, message, btnName, dismissable, error, success, onPress, loading, secundaryAction, secundaryName, withoutIcon, ...props
}) => {
  const { colors } = useTheme()

  useEffect(() => {
    Keyboard.dismiss()
  }, [visible])

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={dismissable ?? false}
        {...props}
        contentContainerStyle={[styles.modal, { backgroundColor: colors.white }]}
      >
        {!withoutIcon && (
        <View style={styles.image}>
          {success && <AntDesign name="checkcircle" size={68} color={colors.green} />}
          {error && <MaterialIcons name="cancel" size={82} color={colors.error} />}
        </View>
        )}
        {title && (
        <View>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.line} />
        </View>
        )}
        <Text style={styles.text}>{message}</Text>

        <Button
          mode="contained"
          onPress={onPress}
          loading={loading}
        >
          {btnName}
        </Button>

        {!!secundaryName && (
        <Button
          mode="outlined"
          onPress={secundaryAction}
          loading={loading}
          style={[styles.secundaryBtn, { borderColor: colors.primary, borderWidth: 1 }]}
        >
          {secundaryName}
        </Button>
        )}
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 40,
    padding: 20,
    borderRadius: 15,
  },
  image: {
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: RFValue(16),
    marginHorizontal: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: RFValue(15),
    marginBottom: 20,
    marginHorizontal: 10,
  },
  secundaryBtn: {
    marginTop: 10,
  },
  line: {
    borderTopWidth: 1,
    opacity: 0.2,
    marginVertical: 10,
    marginHorizontal: 50,
  },
})

export default ModalFeedback
