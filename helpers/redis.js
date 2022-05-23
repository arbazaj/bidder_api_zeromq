const redis = require("redis");

const redisClient = redis.createClient();
redisClient.connect();

redisClient.on('connect', () => {
	console.log('redis connected');
	seed();
})

redisClient.on('error', (error) => console.log(error));

const seatBids = [{
	"seatbid": [{
		"seat": "99999999",
		"bid": [{
			"id": "3b99d0d9-1bff-ff85-882b-3c732f1e6da4",
			"impid": "3b99d0d9-1bff-ff85-882b-3c732f1e6da4",
			"price": 5.0,
			"adid": "ben:payday",
			"cid": "ben:payday",
			"crid": "iAmAudio",
			"audio_url": "https://res.cloudinary.com/blazingtrail-technologies-india-pvt-ltd/video/upload/v1644048242/Bitcoin_Liya_Kya_Chintu_ki_mummy_and_Bitcoin_CoinDCX_Go_App_edixvz.mp3",
			"img_url": "https://res.cloudinary.com/blazingtrail-technologies-india-pvt-ltd/image/upload/v1644049950/CoinDCX-Banner_efsthd.png",
			"click_url": "https://coindcx.com/",
			"image_tracking_url": "https://audiotracker.blazingtrail.in/api/write",
			"audio_tracking_url": "https://audiotracker.blazingtrail.in/impressions"
		}]
	}],
	"cur": "USD"
}, {
	"seatbid": [{
		"seat": "99999999",
		"bid": [{
			"id": "3b99d0d9-1bff-ff85-882b-3c732f1e6da4",
			"impid": "3b99d0d9-1bff-ff85-882b-3c732f1e6da4",
			"price": 5.0,
			"adid": "ben:payday",
			"cid": "ben:payday",
			"crid": "iAmAudio",
			"audio_url": "https://res.cloudinary.com/blazingtrail-technologies-india-pvt-ltd/video/upload/v1643653423/MAGGI_Special_Masala_30_sec_gf9j0m.mp3",
			"img_url": "https://res.cloudinary.com/blazingtrail-technologies-india-pvt-ltd/image/upload/v1643653062/maggi_dnrfrv.jpg",
			"click_url": "https://www.amazon.in/Maggi-Minutes-Noodles-Masala-280/dp/B00OO7C9MW/",
			"image_tracking_url": "https://audiotracker.blazingtrail.in/api/write",
			"audio_tracking_url": "https://audiotracker.blazingtrail.in/impressions"
		}]
	}],
	"cur": "USD"
}, {
	"seatbid": [{
		"seat": "99999999",
		"bid": [{
			"id": "3b99d0d9-1bff-ff85-882b-3c732f1e6da4",
			"impid": "3b99d0d9-1bff-ff85-882b-3c732f1e6da4",
			"price": 5.0,
			"adid": "ben:payday",
			"cid": "ben:payday",
			"crid": "iAmAudio",
			"audio_url": "https://res.cloudinary.com/blazingtrail-technologies-india-pvt-ltd/video/upload/v1643649610/New_Coca-Cola_Zero_Sugar_30_Second_Advert_Coca-Cola_GB_2_hkjewh.mp3",
			"img_url": "https://res.cloudinary.com/blazingtrail-technologies-india-pvt-ltd/image/upload/v1643651499/coke_zero_sugar_c34rot.jpg",
			"click_url": "https://us.coca-cola.com/products/coca-cola-zero-sugar",
			"image_tracking_url": "https://audiotracker.blazingtrail.in/api/write",
			"audio_tracking_url": "https://audiotracker.blazingtrail.in/impressions"
		}]
	}],
	"cur": "USD"
}, {
	"status": "no-fill"
}];

const seed = async () => {
	await Promise.all(seatBids.map((s, i) => redisClient.set(`${i}`, JSON.stringify(s))));
}

module.exports = {
	redisClient
};
