import AsyncStorage from "@react-native-async-storage/async-storage";

// khởi tạo danh sách tài khoản
const accounts = [];

// thêm tài khoản mới vào danh sách
export const addAccount = async (email, username, password) => {
  const newAccount = { email, username, password };
  accounts.push(newAccount);
  await AsyncStorage.setItem("accounts", JSON.stringify(accounts));
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

// sử dụng hàm getAccounts để lấy danh sách tài khoản
export const accountsList = getAccounts();
console.log(accountsList);
