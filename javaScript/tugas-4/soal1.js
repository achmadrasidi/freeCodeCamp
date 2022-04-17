// Buatlah sambungan program menggunakan then catch dan juga try catch untuk mengecek hari kerja
// dari kode Asynchronous dibawah
// dan jelaskan penggunaan then catch dan try catch dengan memberikan komentar di bawahnya:

const cekHariKerja = (day) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const dataDay = ["senin", "selasa", "rabu", "kamis", "jumat"];
      let cek = dataDay.find((item) => {
        return item === day;
      });
      if (cek) {
        resolve(cek);
      } else {
        reject(new Error("Hari ini bukan hari kerja"));
      }
    }, 3000);
  });
};

// fungsi showHariKerjaPromise(day) mengeksekusi promise cekHariKerja(day)
// untuk mengkonsol nilai result dan error menggunakan method then catch
const showHariKerjaPromise = (day) => {
  // cek jika parameter day bukan string
  if (typeof day !== "string") {
    console.log("parameter day harus berupa String");
    return;
  }
  // proses eksekusi promise then catch
  cekHariKerja(day)
    .then((result) => console.log(`Hari ini hari kerja ${result}`))
    .catch((err) => console.log(err.message));
  // proses then catch
  // metode then(())=>{}) bisa digunakan untuk menangani resolve pada promise
  // then mempunyai parameter callback function dengan 1 paramater pada callbacknya
  // parameter pada callbacknya menghasilkan nilai resolve pada promise
  // metode catch(()=>{}) bisa digunakan untuk menangani reject pada promise
  // catch mempunyai parameter callback function dengan 1 parameter pada callbacknya
  // parameter pada callbacknya menghasilkan nilai reject pada promise
};

// showHariKerja(day) mengeksekusi fungsi asyncronous promise cekHariKerja(day)
// untuk mengkonsol nilai result dan error dengan keyword async dan await pada fungsi
// serta menggunakan statement try catch
const showHariKerja = async (day) => {
  // cek jika parameter day bukan string
  if (typeof day !== "string") {
    console.log("parameter day harus berupa string");
    return;
  }
  // proses eksekusi promise try catch
  try {
    const result = await cekHariKerja(day);
    console.log(`Hari ini hari kerja ${result}`);
  } catch (err) {
    console.log(err.message);
  }
  // proses try catch
  // try statement disini digunakan untuk mencoba dan mengeksekusi promise
  // cara mengeksekusi promise pada try, biasanya digunakan didalam fungsi dengan keyword async
  // memasukkan fungsi promise ke dalam variabel
  // pada fungsi promise menggunakan keyword await
  // nilai yang dihasilkan try disini adalah hasil resolve dari fungsi await promise
  // catch statement disini digunakan untuk menghandle atau menangani error/pengecualian pada try
  // catch dapat menerima parameter hasil error/pengecualian dari try yang merupakan hasil reject dari fungsi await promise
};

// showHariKerjaPromise("senin");
// showHariKerja("senin");
