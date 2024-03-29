const { TwitterApi } = require("twitter-api-v2");
const axios = require('axios');

const client = new TwitterApi({
  appKey: 'j1aHrygOyXNFqOb2V0k7Qce4v',
  appSecret: 'zCM91rXKW3Jlps9NIVykoTmrk00z3ECYyqMFwA8OXn0mHgJtVh',
  accessToken: '1758102572303634434-Qi229eLJJ15U4adGSDIDcK4DtLxd6l',
  accessSecret: 'cB0qbNjKjmDMMoZEdN8cz23ppGSFZolSwSdMVdQKb586S'
});

const twitterClient = client.readWrite;

const tweet = async (isi) => {
  try {
    await twitterClient.v2.tweet(isi);
    console.log("sukses")
  } catch (e) {
    console.log(e)
  }
}

// URL situs web yang akan diakses
const url = 'https://sirekap-obj-data.kpu.go.id/pemilu/hhcw/ppwp.json';

// Fungsi untuk melakukan permintaan GET menggunakan Axios
async function getData() {
  try {
    // Mengirim permintaan GET ke situs web
    const response = await axios.get(url);

    // Menampilkan data hasil respons
    const c1 = response.data.chart['100025']
    const c2 = response.data.chart['100026']
    const c3 = response.data.chart['100027']
    const persen = response.data.chart['persen']
    const total = c1+c2+c3
    const persentaseData1 = ((c1 / total) * 100).toFixed(2)
    const persentaseData2 = ((c2 / total) * 100).toFixed(2)
    const persentaseData3 = ((c3 / total) * 100).toFixed(2)
    const progres = response.data.progres['progres']
    const totaltps = response.data.progres['total']
    const persentps = ((progres / totaltps) * 100).toFixed(2)
    const waktu = response.data.ts
    const text = `HASIL HITUNG SUARA PEMILU PRESIDEN & WAKIL PRESIDEN RI 2024 #Pemilu2024\n\nVersi: ${waktu} Progress: ${progres} dari ${totaltps} TPS (${persentps}%)\n\n01 : Suara ${c1} (${persentaseData1}%)\n\n02 : Suara ${c2} (${persentaseData2}%)\n\n03 : Suara ${c3} (${persentaseData3}%)\n\nSumber: https://pemilu2024.kpu.go.id/
    `
    tweet(text);
  } catch (error) {
    console.error('Terjadi kesalahan:', error.message);
  }
}

// Panggil fungsi untuk mendapatkan data
getData();

