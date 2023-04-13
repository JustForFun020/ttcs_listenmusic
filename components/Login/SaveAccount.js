import AsyncStorage from "@react-native-async-storage/async-storage";

// khởi tạo danh sách tài khoản
const accounts = [];

// thêm tài khoản mới vào danh sách
export const addAccount = async (email, username, password) => {
  const newAccount = { email, username, password };
  accounts.push(newAccount);
  await AsyncStorage.setItem("accounts", JSON.stringify(accounts));
  console.log(accounts);
};

// lấy danh sách tài khoản từ AsyncStorage
export const getAccounts = async () => {
  const accountsData = await AsyncStorage.getItem("accounts");
  if (accountsData) {
    return JSON.parse(accountsData);
  } else {
    return [];
  }
};

const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};
