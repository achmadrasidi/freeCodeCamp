// Buatlah program menggunakan method fetch untuk menampilkan semua name (hanya name nya saja) dari REST API dibawah ini
// https://jsonplaceholder.typicode.com/users
// Gunakan debugger console bawaan browser Chrome untuk melihat hasilnya

// fetch => metode browser javascript yang mengambil request dari url untuk dijadikan response yang berupa promise
const getName = () => {
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Response status ${res.ok}`);
      }
      return res.json();
    })
    .then((data) => {
      if (!data) {
        throw new Error("data tidak ditemukan");
      }
      return data.forEach((val) => console.log(val.name));
    })
    .catch((err) => console.log(err.message));
};

const getNameAsync = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error(`Response status ${res.ok}`);
    }
    const data = await response.json();
    if (!data) {
      throw new Error("data tidak ditemukan");
    }
    return data.forEach((val) => console.log(val.name));
  } catch (error) {
    console.log(error.message);
  }
};
getName();
