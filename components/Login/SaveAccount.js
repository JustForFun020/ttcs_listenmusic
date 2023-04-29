import AsyncStorage from '@react-native-async-storage/async-storage';

const accounts = [];

export const addAccount = async (email, username, password) => {
  const newAccount = { email, username, password };
  accounts.push(newAccount);
  await AsyncStorage.setItem('accounts', JSON.stringify(accounts));
};

const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

const clearAllData = async () => {
  try {
    await AsyncStorage.multiRemove(await AsyncStorage.getAllKeys());
  } catch (error) {
    console.error('Error clearing data:', error);
  }
};
