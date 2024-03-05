import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAlert } from '../../Provider/AlertProvider';

const Alert = () => {
  const { alert, hideAlert } = useAlert();

  if (!alert) return null;

  return (
    <View>
      <Text>{alert.message}</Text>
      <Button title="OK" onPress={hideAlert} />
    </View>
  );
};

export default Alert;
