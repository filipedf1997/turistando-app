import React, { useEffect } from 'react'
import {
  Modal, Portal, Text, useTheme,
} from 'react-native-paper'
import { StyleSheet, View, Keyboard } from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import Button from './Button'
import { RFValue } from 'react-native-responsive-fontsize'

const ModalFeedback = ({
  visible, message, btnName, dismissable, error, success, onPress, loading, secundaryAction, secundaryName, withoutIcon, ...props
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
        <Text style={styles.text}>{message}</Text>

        {!!secundaryName && (
        <Button
          mode="text"
          onPress={secundaryAction}
          loading={loading}
          style={styles.secundaryBtn}
        >
          {secundaryName}
        </Button>
        )}

        <Button
          mode="contained"
          onPress={onPress}
          loading={loading}
        >
          {btnName}
        </Button>
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
  text: {
    textAlign: 'center',
    fontSize: RFValue(16),
    marginBottom: 20,
    marginHorizontal: 10,
  },
  secundaryBtn: {
    marginBottom: 8,
  },
})

export default ModalFeedback
