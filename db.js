// config/database.js
 module.exports = {
     'connection': {
            'host': '10.0.10.193',
        'user': 'DB_USER',
   'password': 'DB_PASSWORD'

 		// 'host': 'localhost',
   //      'user': 'root',
 		// 'password': ''
    },
     'database': 'DB_USER',
     //'database': 'vidly',
    'port':61337,

    'url': {
    	'notifyUrl': 'https://vidly.io/notify/',
        'redditUrl': 'https://vidly.io/auth/reddit/callback',
        'redditKey': 'HrDqC32DOzsTtw',
        'redditSecret': '5aYBvF6fLEtlFXxGQmHLN8kjjmk'
        
        // 'notifyUrl': 'http://mastersoftwaretechnologies.com:61337/notify/',
        // 'redditUrl': 'http://mastersoftwaretechnologies.com:61337/auth/reddit/callback',
        // 'redditKey': 'DRiZeimles1i_w',
        // 'redditSecret': 'f-Cj_BizGJPhI_Q7u9o2GbHqaAU'
    }
 };
 

