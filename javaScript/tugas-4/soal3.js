// Buatlah 2 program bebas dengan menggunakan promise seperti soal nomor 1

// 1. Program untuk meringkas kalimat
const getSummarize = (str, limit) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let newStr = str.split(/[ ,]+/);
      if (newStr.length > limit) {
        resolve(newStr.slice(0, limit).join(" ") + "...");
      } else {
        reject(new Error("Kalimat tidak bisa diringkas"));
      }
    }, 1500);
  });
};

const showSummarize = (str, limit) => {
  // cek tipe data parameter
  if (typeof str !== "string") {
    console.log("str harus string berisi kalimat");
    return;
  }

  if (typeof limit !== "number") {
    console.log("limit harus number berisi limit kata");
    return;
  }
  // menunggu proses timeout asyncronous
  console.log("meringkas kalimat...");
  // proses eksekusi promise then catch
  getSummarize(str, limit)
    .then((result) => console.log(result))
    .catch((err) => console.log(err.message));
};

// showSummarize("Nama saya Achmad Rasidi,saya sedang mengikuti bootcamp Fazztrack", 5);

// 2. Program pencarian rating film berdasarkan tahun
const getMovies = (tahun, minRating) => {
  // Pembuatan Promise pencarian film
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Data film
      const data = [
        {
          judul: "CODA",
          tahun: 2021,
          rating: 8,
        },
        {
          judul: "Spider-Man: No Way Home",
          tahun: 2021,
          rating: 8.5,
        },
        {
          judul: "The Power of the Dog",
          tahun: 2021,
          rating: 6.9,
        },
        {
          judul: "Nightmare Alleys",
          tahun: 2021,
          rating: 7.1,
        },
        {
          judul: "The King's Man",
          tahun: 2021,
          rating: 6.3,
        },
        {
          judul: "The Shawsank Redemption",
          tahun: 2022,
          rating: 9.2,
        },
        {
          judul: "Death on the Nile",
          tahun: 2022,
          rating: 6.4,
        },
        {
          judul: "Morbius",
          tahun: 2022,
          rating: 5.2,
        },
        {
          judul: "The Batman",
          tahun: 2022,
          rating: 8.3,
        },
        {
          judul: "Sonic the Hedgedog 2",
          tahun: 2022,
          rating: 7.0,
        },
      ];
      // proses filter film dari data film berdasarkan parameter tahun dan rating
      let movies = data.filter((movie) => movie.tahun === tahun && movie.rating >= minRating).sort((a, b) => b.rating - a.rating);
      // proses pengecekan resolve dan reject
      if (movies.length > 0) {
        resolve(movies);
      } else {
        reject(new Error("Film tidak ditemukan"));
      }
    }, 2000);
  });
};

const showMovies = async (tahun, minRating) => {
  // cek jika parameter tahun bukan number
  if (typeof tahun !== "number") {
    console.log("tahun harus berupa number tahun film");
    return;
  }
  // cek jika parameter minRating bukan number
  if (typeof minRating !== "number") {
    console.log("minRating harus berupa number minimal rating film");
    return;
  }
  // menunggu proses timeout asyncronous
  console.log("mengambil data...");
  // proses eksekusi promise try catch
  try {
    const films = await getMovies(tahun, minRating);
    films.forEach((film) => console.log(film.judul, film.rating));
  } catch (err) {
    console.log(err.message);
  }
};

showMovies(2021, 5);

// 3. Program tebak angka
const getResult = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNum = Math.floor(Math.random() * 10 + 1);
      if (num > 10) {
        reject(new Error("Hanya masukkan angka 1 - 10"));
      }
      if (randomNum === num) {
        resolve({ hasil: "Benar", randomNum });
      } else if (num === randomNum - 1 || num === randomNum + 1) {
        resolve({ hasil: "Sedikit lagi", randomNum });
      } else {
        resolve({ hasil: "Salah", randomNum });
      }
    }, 2500);
  });
};

const showResult = (num) => {
  if (typeof num !== "number") {
    console.log("num harus berupa number angka");
  }
  console.log("mengambil hasil...");
  getResult(num)
    .then((result) => console.log(`Kamu ${result.hasil}, angkanya ${result.randomNum}`))
    .catch((err) => console.log(err.message));
};

// showResult(7);
