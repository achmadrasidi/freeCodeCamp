// Buat program menggunakan callback function untuk melanjutkan dan menampilkan semua bulan menggunakan method map

const getMonth = (callback) => {
  setTimeout(() => {
    let error = true;
    //prettier-ignore
    let month = ["January","February","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November",
        "Desember"]
    if (!error) {
      callback(null, month);
    } else {
      callback(new Error("Sorry Data Not Found"), []);
    }
  }, 1000);
};

// Callback function untuk melanjutkan dan menampilkan semua bulan menggunakan method map
const showMonth = (err, month) => {
  // jika ada error tampilkan pesan error
  if (err) {
    console.log(err.message);
    return;
  }
  // jika tidak ada error maka tampilkan semua bulan dengan method map
  return month.map((val) => console.log(val));
};

getMonth(showMonth);
