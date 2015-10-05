// config/database.js
 module.exports = {
     'connection': {
   //          'host': '10.0.10.193',
   //      'user': 'VV_JyIThFn',
   // 'password': 'KU6caDkvZ7B74#'

 		'host': 'localhost',
        'user': 'root',
 		'password': ''
    },
     //'database': 'vidlydb713',
     'database': 'vidly',
    'port':61337,

    'url': {
    	//'notifyUrl': 'https://vidly.io/notify/',
    	'notifyUrl': 'http://mastersoftwaretechnologies.com:61337/notify/',
    	//'redditUrl': 'https://vidly.io/auth/reddit/callback'
    	'redditUrl': 'http://mastersoftwaretechnologies.com:61337/auth/reddit/callback',

    	'redditKey': 'DRiZeimles1i_w',
    	//'redditKey': 'HrDqC32DOzsTtw',
    	'redditSecret': 'f-Cj_BizGJPhI_Q7u9o2GbHqaAU'
    	//'redditSecret': '5aYBvF6fLEtlFXxGQmHLN8kjjmk'
    }
 };
 

